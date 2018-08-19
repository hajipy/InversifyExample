import { inject, injectable } from "inversify";
import { IClient } from "../interfaces/IClient";
import { IService } from "../interfaces/IService";

@injectable()
export class ClientImpl implements IClient {
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
