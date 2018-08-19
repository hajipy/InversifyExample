import { Container, injectable } from "inversify";

import "reflect-metadata";

import { IClient } from "../interfaces/IClient";
import { IService } from "../interfaces/IService";
import { ClientImpl } from "../production/clientImpl";

// 「IService」インターフェイスを実装したモッククラス
@injectable()
export class ServiceMock implements IService {
    public func(): void {
        console.log("ServiceMock.func()");
    }
}

const container = new Container();

// 「ClientImpl」クラスのテストを行いたい場合、識別子「Service」に「ServiceMock」クラスをバインドする
// 識別子「Repository」と識別子「Gateway」は使用されないため、バインドは不要
container.bind<IService>("Service").to(ServiceMock);
container.bind<IClient>("Client").to(ClientImpl);

// // 識別子「Client」にバインドされているオブジェクトを取得する
const client = container.get<IClient>("Client");

// 取得できた「IClient」インターフェイスを実装したオブジェクトに含まれるfunc()を呼び出すと以下の出力が得られる
// ClientImpl.func()
// ServiceMock.func()
client.func();
