import HttpMethod from "api/constants/httpMethods";
import RequestConfig from "../interfaces/requestConfig";
import ApiProvider from "./apiProvider";
import IApiService from "../interfaces/apiService";


export default class ApiService implements IApiService {
    private provider: ApiProvider;

    constructor(config: RequestConfig) {
        this.provider = new ApiProvider({
            ...config,
        });
    }

    private async request<T>(method: HttpMethod, url: string, data?: T, config?: RequestConfig): Promise<T> {
        const requestConfig = {
            method,
            url,
            data,
            ...config,
        };
        return this.provider.request(requestConfig);
    }

     get<T>(url: string, config?: RequestConfig): Promise<T> {
        const method = HttpMethod.GET;
        return this.request<T>(method, url, undefined, config)
    }

     delete<T>(url: string, config?: RequestConfig): Promise<T> {
        const method = HttpMethod.DELETE;
        return this.provider.request({
            method,
            url,
            ...{
                ...config,
            },
        });
    }

     post<T>(
        url: string,
        data: T,
        config?: RequestConfig
    ): Promise<T> {
        const method = HttpMethod.POST;
        return this.request<T>(method, url, data, config);
    }

     put<T>(
        url: string,
        data: T,
        config?: RequestConfig
    ): Promise<T> {
        const method = HttpMethod.PUT;
        return this.request<T>(method, url, data, config);
    }

     patch<T>(
        url: string,
        data?: T,
        config?: RequestConfig
    ): Promise<T> {
        const method = HttpMethod.PATCH;
        return this.request<T>(method, url, data, config);
    }
}
