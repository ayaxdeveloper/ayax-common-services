import { AxiosPromise } from "axios";
import { BaseHttpService } from "./base-http-service";
import { OperationResult, Operation, IOperationService, IHttpService } from "ayax-common-types";

export class OperationService extends BaseHttpService implements IOperationService {

    constructor(httpService: IHttpService) {
        super(httpService);
    }

    rawGet<T>(url: string): AxiosPromise<OperationResult<T>> {
        return this._http.get(url);
    }

    rawPost<T>(url: string, data: any): AxiosPromise<OperationResult<T>> {
        return this._http.post(url, data);
    }

    rawPut<T>(url: any, data: any): AxiosPromise<Operation> {
        return this._http.put(url, data);
    }
    rawDelete<T>(url: any): AxiosPromise<Operation> {
        return this._http.delete(url);
    }
}