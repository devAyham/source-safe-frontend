import { AuthServiceName, IAuthEntity, useAuthApi } from "services/authService";
import useOnSuccessLoginHelper from "../hooks/useOnSuccessLoginHelper";
import { AxiosResponse } from "axios";
import { CustomEndPoints } from "api/constants/customEndPoints";

/**
 *
 * @returns
 */
export const useNewLogin = () => {
  const { onSuccessLoginHelper } = useOnSuccessLoginHelper();
  const { createEntity } = useAuthApi({
    customServiceName: `${AuthServiceName}/${CustomEndPoints.SignIn}`,
    options: {
      createConfig: {
        onSuccess(data: AxiosResponse<IAuthEntity>) {
          const {
            data: { user, tokens },
          } = data;
          onSuccessLoginHelper({
            tokens,
            user,
          });
        },
      },
    },
  });

  return createEntity;
};
