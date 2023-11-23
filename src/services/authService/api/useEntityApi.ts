import { IApiCrudConfig } from "../../../api/interfaces/apiCrudConfig";
import ICreate from "../interfaces/Create.interface";
import IGetResponse from "../interfaces/GetResponse.interface";
import IRequestParams from "../interfaces/RequestParams.interface";
import IGetAllResponse from "../interfaces/GetAllResponse.interface";
import { ServiceName } from "../constant/ServiceName";
import useApiCRUD from "api/apiHooks/useApiCrud";
import IUpdate from "../interfaces/Update.interface";

interface Props {
  customServiceName?: string;
  options?: IApiCrudConfig<
    IRequestParams,
    ICreate,
    IUpdate,
    IUpdate,
    IGetResponse,
    IGetAllResponse
  >;
}

const useEntityApi = ({ customServiceName, options }: Props) => {
  return useApiCRUD<
    IRequestParams,
    ICreate,
    IUpdate,
    IUpdate,
    IGetResponse,
    IGetAllResponse
  >(
    ServiceName,
    {
      ...options,
      getAllConfig: {
        enabled: false,
      },
      getDetailsConfig: {
        enabled: false,
        id: "",
      },
    },
    customServiceName
      ? {
          createEndpoint: customServiceName,
          deleteEndpoint: ServiceName,
          updateEndpoint: customServiceName,
          getAllEndpoint: ServiceName,
          getEndpoint: ServiceName,
        }
      : undefined
  );
};
export default useEntityApi;
