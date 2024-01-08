import { InterceptorProps } from "api/interfaces/InterceptorProps";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import i18n from "i18next";

export default class ApiProvider {
  private readonly axiosInstance: AxiosInstance;

  constructor({ config, getNewTokens, tokens }: InterceptorProps) {
    this.axiosInstance = axios.create(config);
    this.setupInterceptors({ config, getNewTokens, tokens });
  }
  private setupInterceptors(interceptorProps: InterceptorProps) {
    const { getNewTokens, tokens } = interceptorProps;
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${tokens?.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error?.response?.status === 401 &&
          !prevRequest?.sent &&
          tokens?.refreshToken
        ) {
          prevRequest.sent = true;
          const newTokens = await getNewTokens();
          if (newTokens.accessToken) {
            prevRequest.headers[
              "Authorization"
            ] = `Bearer ${newTokens?.accessToken}`;
            return this.axiosInstance(prevRequest);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      // Get the current language from the i18n library
      const language = i18n.language;

      // Update the headers property to include the Accept-Language header
      config.headers = {
        ...(config.headers as any),
        "Accept-Language": language,
      };
      const response: AxiosResponse<T> = await this.axiosInstance.request(
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
