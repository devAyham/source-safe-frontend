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
    ICreate,
    IUpdate,
    IUpdate,
    IGetResponse,
    IGetAllResponse
  >
) => {
  return useApiCRUD<
    IRequestParams,
    ICreate,
    IUpdate,
    IUpdate,
    IGetResponse,
    IGetAllResponse
  >(ServiceName, options);
};
export default useEntityApi;
