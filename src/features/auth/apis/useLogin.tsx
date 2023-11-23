import { IAuthEntity, useAuthApi } from "services/authService";
import useOnSuccessLoginHelper from "../hooks/useOnSuccessLoginHelper";
import { AxiosResponse } from "axios";

/**
 *
 * @returns
 */
export const useNewLogin = () => {
  const { onSuccessLoginHelper } = useOnSuccessLoginHelper();
  const { createEntity } = useAuthApi({
    customServiceName: "/auth/login/web",
    options: {
      createConfig: {
        //The data has any type why?
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
