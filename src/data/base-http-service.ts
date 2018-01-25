import { IHttpService } from "ayax-common-types";

export abstract class BaseHttpService {
    _http: IHttpService;
    _postFix: string;

    constructor(http: IHttpService, postFix?: string) {
        this._http = http;
        if(postFix)
        this._postFix = postFix;
    }
}