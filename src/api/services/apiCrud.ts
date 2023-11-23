import { AxiosRequestConfig } from "axios";
import ApiService from "./apiService";
import { ICustomEndpoints } from "../interfaces/customEndPoints";
import { IRequestParams } from "../interfaces/requestParams";
import { httpMethodsDefaultSuffix } from "../constants/httpMethodsDefaultSuffix";
import { addHeaders } from "../helpers/addHeaders";
import { EntityIdInterface } from "../../interfaces/EntityId.interface";
import { EntityIdType } from "../../types/EntityId.type";

export interface ICrudResponse<T> {
  data: T;
  message?: string;
  extra?:any
}

export class CRUDService<
  requestParams,
  createRequest,
  updateRequest,
  patchRequest,
  getResponse,
  getAllResponse
> extends ApiService {
  customEndpoints?: ICustomEndpoints;

  constructor(
    serviceName: string,
    customEndpoints?: ICustomEndpoints,
    headers?: any,
    customConfig?: AxiosRequestConfig
  ) {
    super({
      baseURL: `${process.env.REACT_APP_BASE_API_URL}${
        !customEndpoints ? serviceName : ""
      }`,
      headers: {
        ...headers,
        ...(customConfig ? customConfig.headers : (addHeaders(headers) as any)),
      },
    });
    if (customEndpoints) this.customEndpoints = customEndpoints;
  }

  public getAll = (
    params?: IRequestParams<requestParams>
  ): Promise<ICrudResponse<getAllResponse>> => {
    return this.get<ICrudResponse<getAllResponse>>(
      this.customEndpoints?.getAllEndpoint ?? "",
      {
        params: {
          ...params,
        },
      }
    );
  };

  public getDetails = ({
    id,
    params,
  }: {
    id: EntityIdType;
    params?: IRequestParams<getResponse>;
  }): Promise<ICrudResponse<getResponse>> => {
    return this.get<ICrudResponse<getResponse>>(
      `${
        this.customEndpoints?.getEndpoint ??
        httpMethodsDefaultSuffix.getEndpoint
      }/${id}`,
      {
        params: params,
      }
    );
  };

  public create = (body: any): Promise<ICrudResponse<getResponse>> => {
    return this.post<ICrudResponse<getResponse>>(
      this.customEndpoints?.createEndpoint ??
        httpMethodsDefaultSuffix.createEndpoint,
      body
    );
  };

  public update = (
    body: any & EntityIdInterface
  ): Promise<ICrudResponse<getResponse>> => {
    return this.put<ICrudResponse<getResponse>>(
      `${
        this.customEndpoints?.updateEndpoint ??
        httpMethodsDefaultSuffix.updateEndpoint
      }/${body.id}`,
      body
    );
  };

  public deleteItem = ({ id }: EntityIdInterface): Promise<any> => {
    return this.delete(
      `${
        this.customEndpoints?.deleteEndpoint ??
        httpMethodsDefaultSuffix.deleteEndpoint
      }/${id}`
    );
  };

  public patchItem = (
    body: any & EntityIdInterface
  ): Promise<ICrudResponse<getResponse>> => {
    return this.patch<ICrudResponse<getResponse>>(
      `${
        this.customEndpoints?.patchEndpoint ??
        httpMethodsDefaultSuffix.patchEndpoint
      }/${body.id}`,
      body
    );
  };
}
