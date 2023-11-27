import { useDecryptUserData } from "features/auth/hooks/useDecryptUserData";
import { useGetAccessWithoutLogin } from "features/auth/hooks/useGetAccessWithoutLogin";
import { AuthStateInterface } from "features/auth/interfaces/AuthStateInterface.d";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { useLayoutEffect } from "react";

const AuthProvider = ({ children }: any) => {
  const { isValid, isChecked, decryptedInfo } = useDecryptUserData();
  const { getAccessWithoutLogin } = useGetAccessWithoutLogin();

  useLayoutEffect(() => {
    if (isChecked && isValid) {
      getAccessWithoutLogin(decryptedInfo as AuthStateInterface);
    }
  }, [isChecked]);

  return <>{children}</>;
};

export default AuthProvider;
