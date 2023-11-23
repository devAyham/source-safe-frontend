import { AES, enc } from "crypto-js";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AuthStateInterface } from "../interfaces/AuthStateInterface.d";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "features/common/hooks/useReduxHooks";
import { UiSliceActions } from "features/common/redux/slices/uiSlices";
import useHandleUserCredantilesInStorge from "./useHandleUserCredantilesInStorge";

/**
 *
 * @returns
 */
export const useDecryptUserData = () => {
  const dispatch = useAppDispatch();
  const [isValid, setIsValid] = useState(false);
  const [isChecked, setISChecked] = useState(false);
  const [decryptedInfo, setDecryptedInfo] = useState<AuthStateInterface | null>(
    null
  );
  const [cookies, _, removeCookie] = useCookies(["user"]);
  const { removeUserCredantilesInStorge } = useHandleUserCredantilesInStorge();
  const { t } = useTranslation();
  const cipherText =
    sessionStorage.getItem("user") ??
    cookies.user ??
    localStorage.getItem("user");
  useEffect(() => {
    if (cipherText) {
      try {
        let bytes = AES.decrypt(
          cipherText,
          process.env.REACT_APP_SECRET_CODE as string
        );
        setIsValid(true);
        setISChecked(true);
        setDecryptedInfo(
          JSON.parse(bytes.toString(enc.Utf8)) as AuthStateInterface
        );
      } catch (err) {
        dispatch(UiSliceActions.SetError({ message: t("sessionExpired") }));
        removeUserCredantilesInStorge();
        setIsValid(false);
        setISChecked(true);
        setDecryptedInfo(null);
      }
    } else {
      setIsValid(false);
      setISChecked(true);
      setDecryptedInfo(null);
    }
  }, []);
  return { isValid, isChecked, decryptedInfo };
};
