import * as moment from 'moment';
import { SelectItem, Dictionary, IDictionaryService, IHttpService, IListDataService, IClientSettings } from "ayax-common-types";
import { ListDataService } from '../data/list-data-service';

export default class DictionaryService implements IDictionaryService {
    private _httpService: IHttpService;
    private _clientSettings: IClientSettings;
    private _predefinedDictionary: {[name: string] : Dictionary[]}
    constructor(httpService: IHttpService, clientSettings: IClientSettings, predefinedDictionary?: {[name: string] : Dictionary[]}) {
        this._httpService = httpService;
        this._clientSettings = clientSettings;
        this._predefinedDictionary = predefinedDictionary ? predefinedDictionary : {};
    }
    public GetDictionary(name: string): Promise<Dictionary[]> {
        return new Promise((resolve) => {
            let storage = localStorage.getItem(name);
            if(storage) {
                let cache: DictionaryCache = JSON.parse(storage);
                if(moment(cache.expires).isAfter() && cache.data.length > 0) {
                    resolve(cache.data);
                } else {
                    this.FromApi(name).then((response) => {
                        this.ToCache(name, response);
                        resolve(response);
                    });
                }
            } else {
                this.FromApi(name).then((response) => {
                    this.ToCache(name, response);
                    resolve(response);
                });
            }
        })
    }

    public GetSelectItems(name: string): Promise<SelectItem[]> {
        return new Promise((resolve)=> {
            this.GetDictionary(name).then((response) => {
                resolve(response.map(x=> new SelectItem({text: x.name, value: x.id})))
            })
        });
    }

    private async FromApi(name: string): Promise<Dictionary[]> {
        try {
            if(this._predefinedDictionary[name.toLocaleLowerCase()].length > 0) {
                return this._predefinedDictionary[name.toLocaleLowerCase()];
            } else {
                let service: IListDataService = new ListDataService(this._httpService, `/${name.toLocaleLowerCase()}`);
                let response = await service.list<Dictionary>();
                let operation = response.data;
                if (operation.status === 0) {
                    return operation.result;
                } else {
                    throw new Error(operation.message); 
                }  
            }
        } catch(e) {
            console.log(`Ошибка получения справочника ${name} ${e}`);
        }
        return [];
    }



    private ToCache(name: string, data: Dictionary[]) {
        console.log(moment().add(this._clientSettings.clientCacheExpiresAfter, "m").toDate());
        localStorage.setItem(name.toLowerCase(), JSON.stringify(
            
            new DictionaryCache({
                data: data, expires: moment().add(this._clientSettings.clientCacheExpiresAfter, "m").toDate()
            })));
    }
}

class DictionaryCache {
    data: Dictionary[];
    expires: Date;
    constructor(init?: Partial<DictionaryCache>) {
        if(init) {
            Object.assign(this, init);
        }
    }
}