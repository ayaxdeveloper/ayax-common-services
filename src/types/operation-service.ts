import { OperationResult, Operation } from "ayax-common-types";

export interface IOperationService {
    baseUrl: string;
    get<T>(url: string): Promise<OperationResult<T>>;
    post<T>(url: string, data: any): Promise<OperationResult<T>>;
    put<T>(url: string, data: any): Promise<Operation>;
    delete<T>(url: string, data?: any): Promise<Operation>;
}