import { injectable } from "inversify";
import { IRepository } from "../interfaces/IRepository";

@injectable()
export class RepositoryImpl implements IRepository {
    public func(): void {
        console.log("RepositoryImpl.func()");
    }
}
