import { inject, injectable } from "inversify";
import { IService } from "../interfaces/IService";
import { IRepository } from "../interfaces/IRepository";
import { IGateway } from "../interfaces/IGateway";

@injectable()
export class ServiceImpl implements IService {
    private repository: IRepository;
    private gateway: IGateway;

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
