export interface IHttpService {
    baseUrl: string;
    post<T>(relativeUrl: string, data: any): Promise<T>;
    get<T>(relativeUrl: String): Promise<T>;
    delete<T>(relativeUrl: String): Promise<T>;
    put<T>(relativeUrl: String, data: any): Promise<T>;
}