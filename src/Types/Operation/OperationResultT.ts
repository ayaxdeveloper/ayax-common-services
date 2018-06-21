import { IOperationResult } from "./IOperationResultT";
import { OperationStatus } from "./OperationStatus";

export class OperationResult<T> implements IOperationResult<T> {
    result: T;
    message: string;
    status: OperationStatus;
    ensureSuccess(failure?: (message: string) => void): T {
        if(failure) {
            failure(this.message);
        } else {
            throw new Error(this.message);
        }
        return this.result;
    }
    constructor(init?: Partial<OperationResult<T>>) {
        if(init) {
            Object.assign(this, init);
        }
    }
}