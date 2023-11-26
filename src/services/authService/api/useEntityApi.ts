import { IApiCrudConfig } from "../../../api/interfaces/apiCrudConfig";
import ICreate from "../interfaces/Create.interface";

import { ServiceName } from "../constant/ServiceName";
import useApiCRUD from "api/apiHooks/useApiCrud";

interface Props {
  customServiceName?: string;
  options?: IApiCrudConfig<{}, ICreate, {}, {}, {}, {}>;
}

const useEntityApi = ({ customServiceName, options }: Props) => {
  return useApiCRUD<{}, ICreate, {}, {}, {}, {}>(
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
