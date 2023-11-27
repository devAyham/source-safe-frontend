import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { Axios } from "libs/axios";
import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";

const useAuth = () => {
  const { getNewTokens } = useRefreshToken();
  const { tokens } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const requestIntercept = Axios.interceptors.request.use(
      (config: any) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${tokens?.accessToken}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    const responseIntercept = Axios.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newTokens = await getNewTokens();
          prevRequest.headers[
            "Authorization"
          ] = `Bearer ${newTokens.accessToken}`;
          return Axios(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      Axios.interceptors.request.eject(requestIntercept);
      Axios.interceptors.response.eject(responseIntercept);
    };
  }, [tokens, getNewTokens]);

  return { Axios };
};

export default useAuth;
