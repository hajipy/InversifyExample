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
//  1. 識別子「Client」は「ClientImpl」クラスのコンストラクタを使ってオブジェクトを生成すればよいことを調べる
//  2. 「ClientImpl」クラスのコンストラクタには、識別子「Service」のオブジェクトを渡す必要があることを調べる
//  3. 識別子「Service」は「ServiceImpl」クラスのコンストラクタを使ってオブジェクトを生成すればよいことを調べる
//  4. 「ServiceImpl」クラスのコンストラクタには、識別子「Repository」「Gateway」のオブジェクトを渡す必要があることを調べる
//  5. 識別子「Repository」は「RepositoryImpl」クラスのコンストラクタを使ってオブジェクトを生成すればよいことを調べる
//  6. 「RepositoryImpl」クラスのコンストラクタにはオブジェクトを渡す必要がないことを調べる
//  7. 「RepositoryImpl」クラスのコンストラクタ、引数なしで呼び出し、「IRepository」インターフェイスを実装したオブジェクトを生成する
//  8. 識別子「Gateway」は「GatewayImpl」クラスのコンストラクタを使ってオブジェクトを生成すればよいことを調べる
//  9. 「GatewayImpl」クラスのコンストラクタにはオブジェクトを渡す必要がないことを調べる
// 10. 「GatewayImpl」クラスのコンストラクタを、引数なしで呼び出し、「IGateway」インターフェイスを実装したオブジェクトを生成する
// 11. 「ServiceImpl」クラスのコンストラクタを、手順7と9のオブジェクト引数にして呼び出し、「IService」インターフェイスを実装したオブジェクトを生成する
// 12. 「ClientImpl」クラスのコンストラクタを、手順11のオブジェクト引数にして呼び出し、「IClient」インターフェイスを実装したオブジェクトを生成する
// 13. オブジェクトの生成が完了したので、手順12のオブジェクトを呼び出し元に返す
const client = container.get<IClient>("Client");

// 取得できた「IClient」インターフェイスを実装したオブジェクトに含まれるfunc()を呼び出すと以下の出力が得られる
// ClientImpl.func()
// ServiceImpl.func()
// RepositoryImpl.func()
// GatewayImpl.func()
client.func();
