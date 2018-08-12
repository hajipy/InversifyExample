import { Container, injectable, inject } from "inversify";
import { v4 as uuid } from "uuid";
import "reflect-metadata";

interface Interface1 {
    uuid: string;
}

interface Interface2 {
    interface1: Interface1;
}

interface Interface3 {
    interface1: Interface1;
}

interface Interface4 {
    interface2: Interface2;
    interface3: Interface3;
}

const types = {
    Interface1: "Interface1",
    Interface2: "Interface2",
    Interface3: "Interface3",
    Interface4: "Interface4",
};

@injectable()
class Class1 implements Interface1 {
    public uuid: string;

    public constructor() {
        this.uuid = uuid();
    }
}

@injectable()
class Class2 implements Interface2 {
    public constructor(
        @inject(types.Interface1) public interface1: Interface1
    ) {}
}

@injectable()
class Class3 implements Interface3 {
    public constructor(
        @inject(types.Interface1) public interface1: Interface1
    ) {}
}

@injectable()
class Class4 implements Interface4 {
    public constructor(
        @inject(types.Interface2) public interface2: Interface2,
        @inject(types.Interface3) public interface3: Interface3
    ) {}
}

(() => {
    console.log("inTransientScope");

    const container = new Container();
    container.bind<Interface1>(types.Interface1).to(Class1).inTransientScope();
    container.bind<Interface2>(types.Interface2).to(Class2);
    container.bind<Interface3>(types.Interface3).to(Class3);
    container.bind<Interface4>(types.Interface4).to(Class4);

    const class4Obj1 = container.get<Interface4>(types.Interface4);

    console.log(`    class4Obj1.interface2.interface1.uuid=${class4Obj1.interface2.interface1.uuid}`);
    console.log(`    class4Obj1.interface3.interface1.uuid=${class4Obj1.interface3.interface1.uuid}`);

    const class4Obj2 = container.get<Interface4>(types.Interface4);

    console.log(`    class4Obj2.interface2.interface1.uuid=${class4Obj2.interface2.interface1.uuid}`);
    console.log(`    class4Obj2.interface3.interface1.uuid=${class4Obj2.interface3.interface1.uuid}`);
})();

(() => {
    console.log("inRequestScope");

    const container = new Container();
    container.bind<Interface1>(types.Interface1).to(Class1).inRequestScope();
    container.bind<Interface2>(types.Interface2).to(Class2);
    container.bind<Interface3>(types.Interface3).to(Class3);
    container.bind<Interface4>(types.Interface4).to(Class4);

    const class4Obj1 = container.get<Interface4>(types.Interface4);

    console.log(`    class4Obj1.interface2.interface1.uuid=${class4Obj1.interface2.interface1.uuid}`);
    console.log(`    class4Obj1.interface3.interface1.uuid=${class4Obj1.interface3.interface1.uuid}`);

    const class4Obj2 = container.get<Interface4>(types.Interface4);

    console.log(`    class4Obj2.interface2.interface1.uuid=${class4Obj2.interface2.interface1.uuid}`);
    console.log(`    class4Obj2.interface3.interface1.uuid=${class4Obj2.interface3.interface1.uuid}`);
})();

(() => {
    console.log("inSingletonScope");

    const container = new Container();
    container.bind<Interface1>(types.Interface1).to(Class1).inSingletonScope();
    container.bind<Interface2>(types.Interface2).to(Class2);
    container.bind<Interface3>(types.Interface3).to(Class3);
    container.bind<Interface4>(types.Interface4).to(Class4);

    const class4Obj1 = container.get<Interface4>(types.Interface4);

    console.log(`    class4Obj1.interface2.interface1.uuid=${class4Obj1.interface2.interface1.uuid}`);
    console.log(`    class4Obj1.interface3.interface1.uuid=${class4Obj1.interface3.interface1.uuid}`);

    const class4Obj2 = container.get<Interface4>(types.Interface4);

    console.log(`    class4Obj2.interface2.interface1.uuid=${class4Obj2.interface2.interface1.uuid}`);
    console.log(`    class4Obj2.interface3.interface1.uuid=${class4Obj2.interface3.interface1.uuid}`);
})();
