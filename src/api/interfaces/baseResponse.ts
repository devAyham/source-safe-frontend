import { UseMutationOptions, UseQueryOptions } from "react-query";
import { IPaginationConfig } from "./paginationConfig";

export interface CrudTableResponseData<T> {
  data: T[];
  pagination: IPaginationConfig;
}

export interface IBaseApiResponse<T> {
  data: CrudTableResponseData<T>;
  meta: any;
  extra: any;
}

export interface IUseQueryOptions
  extends Omit<UseQueryOptions<any, any, any, any>, "queryKey" | "queryFn"> {}

// @ts-ignore
export interface IUseMutationOptions
  extends Omit<UseMutationOptions<any, any, any, any>, "mutationFn"> {}
