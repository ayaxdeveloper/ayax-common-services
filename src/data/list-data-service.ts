import { AxiosPromise } from "axios";
import { BaseHttpService } from "./base-http-service";
import { OperationResult, IListDataService, IHttpService } from "ayax-common-types";

export class ListDataService extends BaseHttpService implements IListDataService {

    list<T>(): AxiosPromise<OperationResult<T[]>> {
        return this._http.get(`${this._postFix}/list`);
    }
}