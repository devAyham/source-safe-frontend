import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { useEncrypUsertData } from "./useEncryptUserData";
import useSetUserCredantilesInStorge from "./useHandleUserCredantilesInStorge";
import { UserInterface } from "../interfaces/UserInterface.d";
import { AuthSliceActions } from "../redux/slices/authSlice";

interface Props {
  userInfo: UserInterface;
  token: string;
}
function useSetUserGlobally() {
  const dispatch = useAppDispatch();
  const { setEncryptUserData } = useEncrypUsertData();
  const { rememberMe } = useAppSelector((state) => state.auth);
  const { setUserCredantilesInStorge } = useSetUserCredantilesInStorge();
  const setUserGlobally = ({ token, userInfo }: Props) => {
    const dataEncrypted = setEncryptUserData({
      userInfo,
      token,
      rememberMe,
    });
    dispatch(AuthSliceActions.Login({ userInfo, token, rememberMe }));
    if (dataEncrypted) {
      setUserCredantilesInStorge({
        dataEncrypted,
        rememberMe,
      });
    }
  };

  return { setUserGlobally };
}

export default useSetUserGlobally;
