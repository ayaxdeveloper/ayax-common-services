import { AxiosPromise } from "axios";
import { BaseHttpService } from "./base-http-service";
import { OperationResult, Operation, IOperationService, IHttpService } from "ayax-common-types";

export class OperationService implements IOperationService {

    private _http: IHttpService;

    constructor(httpService: IHttpService) {
        this._http = httpService;
    }

    get<T>(url: string): AxiosPromise<OperationResult<T>> {
        return this._http.get(url);
    }

    post<T>(url: string, data: any): AxiosPromise<OperationResult<T>> {
        return this._http.post(url, data);
    }

    put<T>(url: any, data: any): AxiosPromise<Operation> {
        return this._http.put(url, data);
    }
    delete<T>(url: any): AxiosPromise<Operation> {
        return this._http.delete(url);
    }
}