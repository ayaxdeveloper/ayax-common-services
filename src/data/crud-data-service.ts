import { AxiosPromise } from "axios";
import { BaseHttpService } from "./base-http-service";
import { OperationResult, Operation, ICrudDataService } from "ayax-common-types";

export class CrudDataService extends BaseHttpService implements ICrudDataService {

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
}