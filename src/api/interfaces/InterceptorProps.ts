import RequestConfig from "./requestConfig";

export interface InterceptorProps {
    config: RequestConfig;
    getNewTokens: () => Promise<{
      accessToken: string;
      refreshToken: string;
    }>;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  }