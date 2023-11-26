import RequestConfig from "./requestConfig";

export interface InterceptorProps {
  config: RequestConfig;
  getNewTokens: () => Promise<{
    accessToken: string | null;
    refreshToken: string | null;
  }>;
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
}
