import { AxiosPromise } from "axios";
import { BaseHttpService } from "./base-http-service";
import { OperationResult, Operation, SearchResponse, IDataService } from "ayax-common-types";

export class DataService extends BaseHttpService implements IDataService {

    get<T>(id: any): AxiosPromise<OperationResult<T>> {
        return this._http.get(`${this._postFix}/get/${id}`);
    }

    delete<T>(id: any): AxiosPromise<Operation> {
        return this._http.delete(`${this._postFix}/delete/${id}`);
    }

    update<T>(id: any, data: any): AxiosPromise<Operation> {
        return this._http.put(`${this._postFix}/update/${id}`, data);
    }

    add<T>(data: any): AxiosPromise<OperationResult<T>> {
        return this._http.post(`${this._postFix}/add`, data);
    }

    list<T>(): AxiosPromise<OperationResult<T[]>> {
        return this._http.get(`${this._postFix}/list`);
    }
    
    search<T>(request: any): AxiosPromise<OperationResult<SearchResponse<T>>> {
        return this._http.post(`${this._postFix}/search`, request);
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