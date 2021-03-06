import { IHttpService } from "../../Types/HttpService/IHttpService";

export abstract class BaseHttpService {
    _http: IHttpService;
    _postFix: string;
    baseUrl: string;
    constructor(http: IHttpService, postFix?: string) {
        this._http = http;
        this.baseUrl = http.baseUrl;
        if(postFix)
        this._postFix = postFix;
    }
}