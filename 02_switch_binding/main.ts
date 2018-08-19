import { Container } from "inversify";

import "reflect-metadata";

import { IRepository } from "./interfaces/IRepository";
import { RepositoryImpl } from "./production/repositoryImpl";
import { IGateway } from "./interfaces/IGateway";
import { IService } from "./interfaces/IService";
import { IClient } from "./interfaces/IClient";
import { GatewayImpl } from "./production/gatewayImpl";
import { ServiceImpl } from "./production/serviceImpl";
import { ClientImpl } from "./production/clientImpl";

const container = new Container();

container.bind<IRepository>("Repository").to(RepositoryImpl);
container.bind<IGateway>("Gateway").to(GatewayImpl);
container.bind<IService>("Service").to(ServiceImpl);
container.bind<IClient>("Client").to(ClientImpl);

const client = container.get<IClient>("Client");

// 以下の出力が得られる
// ClientImpl.func()
// ServiceImpl.func()
// RepositoryImpl.func()
// GatewayImpl.func()
client.func();
