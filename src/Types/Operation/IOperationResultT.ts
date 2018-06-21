import { OperationStatus } from "./OperationStatus";

export interface IOperationResult<T> {
    result: T;
    message: string;
    status: OperationStatus;
    ensureSuccess(failure?: (message: string) => void): T
}