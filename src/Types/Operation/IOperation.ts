import { OperationStatus } from "./OperationStatus";

export interface IOperation {
    message: string;
    status: OperationStatus;
    ensureSuccess(failure?: (message: string) => void): IOperation
}