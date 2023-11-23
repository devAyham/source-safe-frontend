import { useRegisterDevice } from "features/auth/apis/useRegisterDevice";
import { useDecryptUserData } from "features/auth/hooks/useDecryptUserData";
import { useGetAccessWithoutLogin } from "features/auth/hooks/useGetAccessWithoutLogin";
import { AuthStateInterface } from "features/auth/interfaces/AuthStateInterface.d";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { useEffect, useLayoutEffect } from "react";

const AuthProvider = ({ children }: any) => {
  const { FCMtoken, language } = useAppSelector((state) => state.ui);
  const { token } = useAppSelector((state) => state.auth);
  const { isValid, isChecked, decryptedInfo } = useDecryptUserData();
  const { mutate: mutateRegister } = useRegisterDevice();
  const { getAccessWithoutLogin } = useGetAccessWithoutLogin();

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (isChecked && isValid) {
      getAccessWithoutLogin(decryptedInfo as AuthStateInterface);
    }
  }, [isChecked]);

  useEffect(() => {
    if (FCMtoken !== null) {
      mutateRegister();
    }
  }, [FCMtoken, token, language]);
  return <>{children}</>;
};

export default AuthProvider;
