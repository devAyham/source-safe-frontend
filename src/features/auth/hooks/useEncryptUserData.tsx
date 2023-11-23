import { AES, enc } from "crypto-js";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { useCookies } from "react-cookie";
import { AuthStateInterface } from "../interfaces/AuthStateInterface.d";
/**
 *
 * @returns
 */
export const useEncrypUsertData = () => {
  const setEncryptUserData = (userData: AuthStateInterface) => {
    try {
      const cipherText = AES.encrypt(
        JSON.stringify(userData),
        process.env.REACT_APP_SECRET_CODE as string
      );

      return cipherText.toString();
      // return true;
    } catch {
      return false;
    }
  };
  return { setEncryptUserData };
};
