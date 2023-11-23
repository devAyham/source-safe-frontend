import RequestConfig from "./requestConfig";

export default interface IApiService {
    get<T>(url: string, config?: RequestConfig): Promise<T>;
    delete<T>(url: string, config?: RequestConfig): Promise<T>;
    post<T>(url: string, data: T, config?: RequestConfig): Promise<T>;
    put<T>(url: string, data: T, config?: RequestConfig): Promise<T>;
    patch<T>(url: string, data?: T, config?: RequestConfig): Promise<T>;
}