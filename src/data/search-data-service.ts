import { AxiosPromise } from "axios";
import { BaseHttpService } from "./base-http-service";
import { OperationResult, SearchResponse, ISearchDataService, IHttpService } from "ayax-common-types";

export class SearchDataService extends BaseHttpService implements ISearchDataService {

    search<T>(request: any): AxiosPromise<OperationResult<SearchResponse<T>>> {
        return this._http.post(`${this._postFix}/search`, request);
    }
}