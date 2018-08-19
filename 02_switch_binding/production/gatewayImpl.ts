import { injectable } from "inversify";
import { IGateway } from "../interfaces/IGateway";

@injectable()
export class GatewayImpl implements IGateway {
    public func(): void {
        console.log("GatewayImpl.func()");
    }
}
