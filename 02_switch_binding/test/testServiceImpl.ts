import { Container, injectable } from "inversify";

import "reflect-metadata";

import { IRepository } from "../interfaces/IRepository";
import { IGateway } from "../interfaces/IGateway";
import { IService } from "../interfaces/IService";
import { ServiceImpl } from "../production/serviceImpl";

// 「IRepository」インターフェイスを実装したモッククラス
@injectable()
export class RepositoryMock implements IRepository {
    public func(): void {
        console.log("RepositoryMock.func()");
    }
}

// 「IGateway」インターフェイスを実装したモッククラス
@injectable()
export class GatewayMock implements IGateway {
    public func(): void {
        console.log("GatewayMock.func()");
    }
}

const container = new Container();

// 「ServiceImpl」クラスのテストを行いたい場合、識別子「Repository」と識別子「Gateway」にモックをバインドする
// 識別子「Client」は使用されないため、バインドは不要
container.bind<IRepository>("Repository").to(RepositoryMock);
container.bind<IGateway>("Gateway").to(GatewayMock);
container.bind<IService>("Service").to(ServiceImpl);

// // 識別子「Service」にバインドされているオブジェクトを取得する
const service = container.get<IService>("Service");

// 取得できた「IService」インターフェイスを実装したオブジェクトに含まれるfunc()を呼び出すと以下の出力が得られる
// ServiceImpl.func()
// RepositoryMock.func()
// GatewayMock.func()
service.func();
