import useApiCRUD from "api/apiHooks/useApiCrud";
import { IApiCrudConfig } from "../../../api/interfaces/apiCrudConfig";
import { ServiceName } from "../constant/ServiceName";
import ICreate from "../interfaces/Create.interface";
import IGetAllResponse from "../interfaces/GetAllResponse.interface";
import IGetResponse from "../interfaces/GetResponse.interface";
import IRequestParams from "../interfaces/RequestParams.interface";
import IUpdate from "../interfaces/Update.interface";
import { ICustomEndpoints } from "api/interfaces/customEndPoints";

const useEntityApi = <T = ICreate | FormData>(
  options?: IApiCrudConfig<
    IRequestParams,
    T,
    IUpdate | FormData,
    IUpdate | FormData,
    IGetResponse,
    IGetAllResponse
  >,
  customEndPoints?: ICustomEndpoints
) => {
  return useApiCRUD<
    IRequestParams,
    T,
    IUpdate | FormData,
    IUpdate | FormData,
    IGetResponse,
    IGetAllResponse
  >(ServiceName, options, customEndPoints);
};
export default useEntityApi;
