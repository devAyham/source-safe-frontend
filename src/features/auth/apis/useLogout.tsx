import { AuthServiceName, useAuthApi } from "services/authService";
import useOnSucessLogoutHelper from "../hooks/useOnSucessLogoutHelper";
import { CustomEndPoints } from "api/constants/customEndPoints";
export const useLogout = () => {
  const { onSuccessLogout } = useOnSucessLogoutHelper();
  const { createEntity } = useAuthApi({
    customServiceName: `${AuthServiceName}/${CustomEndPoints.SignOut}`,
    options: {
      createConfig: {
        onSuccess(res) {
          onSuccessLogout();
        },
      },
    },
  });
  return createEntity;
};
