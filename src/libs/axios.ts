import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthStateInterface } from "features/auth/interfaces/AuthStateInterface.d";
import decryptData from "features/common/helpers/decryptData";

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

/**
 * @description the interceptor for the axios lib
 * with this way of integration we can change the axios lib to any another lib any time we wnat
 */
export const request = async ({
  ...options
}: AxiosRequestConfig): Promise<AxiosResponse> => {
  const decryptedData: AuthStateInterface = decryptData(
    sessionStorage.getItem("user") || ""
  );
  const token = decryptedData?.tokens?.accessToken ?? null;
  Axios.defaults.headers.common.Authorization = `Bearer ${token}`; //from local storage or cookies
  const onSuccess = (response: AxiosResponse) => response;
  const onError = (error: unknown) => {
    // optionaly catch errors and add additional logging here
    throw error;
  };

  try {
    const response = await Axios(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};
