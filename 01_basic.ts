import { Container, inject, injectable } from "inversify";
import "reflect-metadata";

interface IRepository {
    find(query: any): any;
}

@injectable()
class MockRepository implements IRepository {
    public find(query: any): any {
        return {};
    }
}

@injectable()
class Service {
    public constructor(
        @inject("Repository") repository: IRepository
    ) {
    }
}

const container = new Container();

container.bind<IRepository>("Repository").to(MockRepository);
container.bind<Service>("Service").to(Service);

const service = container.get<Service>("Service");
