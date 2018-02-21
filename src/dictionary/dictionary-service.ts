import * as moment from 'moment';
import { SelectItem, Dictionary, IDictionaryService, IHttpService, IListDataService, IClientSettings } from "ayax-common-types";
import { ListDataService } from '../data/list-data-service';
import { SearchDataService } from '..';

export class DictionaryService implements IDictionaryService {
    private _httpService: IHttpService;
    private _clientSettings: IClientSettings;
    private _predefinedDictionary: {[name: string] : any[]}
    constructor(httpService: IHttpService, clientSettings: IClientSettings, predefinedDictionary?: {[name: string] : Dictionary[]}) {
        this._httpService = httpService;
        this._clientSettings = clientSettings;
        this._predefinedDictionary = predefinedDictionary ? predefinedDictionary : {};
    }

    public GetDictionary<T>(name: string, postfix?: string, useSearch?: boolean): Promise<T[]> {
        const dictionaryName = `${name}${postfix ? `_${postfix}`: ""}`;
        return new Promise((resolve) => {
            let storage = localStorage.getItem(dictionaryName);
            if(storage) {
                let cache: DictionaryCache<T> = JSON.parse(storage);
                if(moment(cache.expires).isAfter() && cache.data.length > 0) {
                    resolve(cache.data);
                } else {
                    this.FromApi<T>(name, useSearch).then((response) => {
                        this.ToCache(dictionaryName, response);
                        resolve(response);
                    });
                }
            } else {
                this.FromApi<T>(name, useSearch).then((response) => {
                    this.ToCache(dictionaryName, response);
                    resolve(response);
                });
            }
        })
    }

    private async FromApi<T>(name: string, useSearch?: boolean): Promise<T[]> {
        try { 
            if(this._predefinedDictionary[name.toLocaleLowerCase()]) {
                return this._predefinedDictionary[name.toLocaleLowerCase()];
            } else {
                if(useSearch) {
                    let response = await new SearchDataService(this._httpService, `/${name.toLocaleLowerCase()}`).search<T[]>({page: 1, perPage: 1000});
                    let operation = response.data;
                    if (operation.status === 0) {
                        return operation.result.data;
                    } else {
                        throw new Error(operation.message); 
                    }  
                } else {
                    let response = await new ListDataService(this._httpService, `/${name.toLocaleLowerCase()}`).list<T>();
                    let operation = response.data;
                    if (operation.status === 0) {
                        return operation.result;
                    } else {
                        throw new Error(operation.message); 
                    }  
                }
            }
        } catch(e) {
            console.log(`Ошибка получения справочника ${name} ${e}`);
        }
        return [];
    }



    private ToCache<T>(name: string, data: T[]) {
        // console.log(moment().add(this._clientSettings.clientCacheExpiresAfter, "m").toDate());
        localStorage.setItem(name.toLowerCase(), JSON.stringify(
            
            new DictionaryCache<T>({
                data: data, expires: moment().add(this._clientSettings.clientCacheExpiresAfter, "m").toDate()
            })));
    }
}

class DictionaryCache<T> {
    data: T[] = new Array<T>();
    expires: Date = new Date();
    constructor(init?: Partial<DictionaryCache<T>>) {
        if(init) {
            Object.assign(this, init);
        }
    }
}