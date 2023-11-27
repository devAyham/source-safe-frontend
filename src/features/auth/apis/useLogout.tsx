import { AuthServiceName, useAuthApi } from "services/authService";
import useOnSucessLogoutHelper from "../hooks/useOnSucessLogoutHelper";
import { CustomEndPoints } from "api/constants/customEndPoints";
export const useNewLogout = () => {
  const { onSuccessLogout } = useOnSucessLogoutHelper();
  const { createEntity } = useAuthApi({
    customServiceName: `${AuthServiceName}/${CustomEndPoints.SignOut}`,
    options: {
      createConfig: {
        onSuccess(res) {
          console.log(res);

          onSuccessLogout();
        },
      },
    },
  });
  return createEntity;
};
