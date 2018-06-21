import { BaseHttpService } from "../BaseHttp/BaseHttpService";
import { IOperationService } from "../../Types/OperationService/IOperationService";
import { OperationResult } from "../../Types/Operation/OperationResultT";
import { Operation } from "../../Types/Operation/Operation";

export class OperationService extends BaseHttpService implements IOperationService {
    get<T>(url: string): Promise<OperationResult<T>> {
        return this._http.get(url);
    }

    post<T>(url: string, data: any): Promise<OperationResult<T>> {
        return this._http.post(url, data);
    }

    put<T>(url: any, data: any): Promise<Operation> {
        return this._http.put(url, data);
    }
    delete<T>(url: any, data?: any): Promise<Operation> {
        if(data) {
            return this._http.delete(url, data);
        }
        return this._http.delete(url);
    }
}