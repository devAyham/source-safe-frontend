import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import RequestConfig from "../interfaces/requestConfig";
import i18n from "i18next";


export default class ApiProvider {
    private readonly axiosInstance: AxiosInstance;

    constructor(config: RequestConfig) {
        this.axiosInstance = axios.create(config);
    }

    public async request<T>(config: AxiosRequestConfig): Promise<T> {
        try {
            // Get the current language from the i18n library
            const language = i18n.language;

            // Update the headers property to include the Accept-Language header
            config.headers = {
                ...config.headers as any,
                'Accept-Language': language
            };
            const response: AxiosResponse<T> = await this.axiosInstance.request(config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}