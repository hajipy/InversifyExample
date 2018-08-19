import { Container, inject, injectable } from "inversify";

// inversifyを使うためにはreflect-metadataのimportが必要
import "reflect-metadata";

// インターフェイスを4つ定義
interface IRepository {
    func(): void;
}

interface IGateway {
    func(): void;
}

interface IService {
    func(): void;
}

interface IClient {
    func(): void;
}

// 4つのインターフェイスに対応する実装クラスを定義
// @injectable()デコレータはクラスをinversifyで管理できるようにする
@injectable()
class RepositoryImpl implements IRepository {
    public func(): void {
        console.log("RepositoryImpl.func()");
    }
}

@injectable()
class GatewayImpl implements IGateway {
    public func(): void {
        console.log("GatewayImpl.func()");
    }
}

@injectable()
class ServiceImpl implements IService {
    private repository: IRepository;
    private gateway: IGateway;

    // @inject()デコレータは引数で指定した識別子のオブジェクトを注入する
    public constructor(
        @inject("Repository") repository: IRepository,
        @inject("Gateway") gateway: IGateway
    ) {
        this.repository = repository;
        this.gateway = gateway;
    }

    public func(): void {
        console.log("ServiceImpl.func()");
        this.repository.func();
        this.gateway.func();
    }
}

@injectable()
class ClientImpl implements IClient {
    private service: IService;
    
    public constructor(
        @inject("Service") service: IService
    ) {
        this.service = service;
    }

    public func(): void {
        console.log("ClientImpl.func()");
        this.service.func();
    }
}

// 依存関係を格納するコンテナを作成
const container = new Container();

// 識別子「Repository」に「RepositoryImpl」クラスをバインドする。その型は「IRepository」である
container.bind<IRepository>("Repository").to(RepositoryImpl);
// 同様に残りもバインドしていく
container.bind<IGateway>("Gateway").to(GatewayImpl);
container.bind<IService>("Service").to(ServiceImpl);
container.bind<IClient>("Client").to(ClientImpl);

// コンテナの設定が完了したので、利用してみる
// 識別子「Client」にバインドされているオブジェクトを取得する
// 1.  現在のコンテナ設定の識別子「Client」に対応するクラスである「ClientImpl」クラスのコンストラクタが呼ばれる
// 2.  「ClientImpl」のコンストラクタは識別子「Service」のオブジェクトが必要なので取得を試みる
// 3.  現在のコンテナ設定の識別子「Service」に対応するクラスである「ServiceImpl」クラスのコンストラクタが呼ばれる
// 4+. 以下同様に依存関係が解決されていく
const client = container.get<IClient>("Client");

// 取得できた「IClient」インターフェイスを実装したオブジェクトに含まれるfunc()を呼び出すと以下の出力が得られる
// ClientImpl.func()
// ServiceImpl.func()
// RepositoryImpl.func()
// GatewayImpl.func()
client.func();
