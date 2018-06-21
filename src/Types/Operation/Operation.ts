import { OperationStatus } from "./OperationStatus";
import { IOperation } from "./IOperation";

export class Operation implements IOperation {
    message: string;
    status: OperationStatus;
    constructor(init?: Partial<Operation>) {
        if(init) {
            Object.assign(this, init);
        }
    }

    ensureSuccess(failure?: (message: string) => void): Operation {
        if(this.status == 0) {
            return this;
        } else {
            if(failure) {
                failure(this.message);
            }
            throw new Error(`Ошибка выполнения операции ${this.message}`);
        }
    }
}