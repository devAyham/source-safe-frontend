import useApiCRUD from "api/apiHooks/useApiCrud";
import { IApiCrudConfig } from "../../../api/interfaces/apiCrudConfig";
import { ServiceName } from "../constant/ServiceName";
import ICreate from "../interfaces/Create.interface";
import IGetAllResponse from "../interfaces/GetAllResponse.interface";
import IGetResponse from "../interfaces/GetResponse.interface";
import IRequestParams from "../interfaces/RequestParams.interface";
import IUpdate from "../interfaces/Update.interface";

const useEntityApi = (
  options?: IApiCrudConfig<
    IRequestParams,
    ICreate | FormData,
    IUpdate | FormData,
    IUpdate | FormData,
    IGetResponse,
    IGetAllResponse
  >
) => {
  return useApiCRUD<
    IRequestParams,
    ICreate | FormData,
    IUpdate | FormData,
    IUpdate | FormData,
    IGetResponse,
    IGetAllResponse
  >(ServiceName, options);
};
export default useEntityApi;
