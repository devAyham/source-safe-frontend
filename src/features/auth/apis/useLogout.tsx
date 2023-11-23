import { useAuthApi } from "services/authService";
import useOnSucessLogoutHelper from "../hooks/useOnSucessLogoutHelper";
export const useNewLogout = () => {
  const { onSuccessLogout } = useOnSucessLogoutHelper();
  const { createEntity } = useAuthApi({
    customServiceName: "auth/logout",
    options: {
      createConfig: {
        onSuccess() {
          onSuccessLogout();
        },
      },
    },
  });
  return createEntity;
};
