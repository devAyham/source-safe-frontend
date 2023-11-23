import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { useEncrypUsertData } from "./useEncryptUserData";
import useSetUserCredantilesInStorge from "./useHandleUserCredantilesInStorge";
import { UserInterface } from "../interfaces/UserInterface.d";
import { AuthSliceActions } from "../redux/slices/authSlice";
import { AuthStateInterface } from "../interfaces/AuthStateInterface.d";

interface Props {
  user: UserInterface;
  tokens: AuthStateInterface["tokens"];
}
function useSetUserGlobally() {
  const dispatch = useAppDispatch();
  const { setEncryptUserData } = useEncrypUsertData();
  const { rememberMe } = useAppSelector((state) => state.auth);
  const { setUserCredantilesInStorge } = useSetUserCredantilesInStorge();
  const setUserGlobally = ({ tokens, user }: Props) => {
    const dataEncrypted = setEncryptUserData({
      user,
      tokens,
      rememberMe,
    });
    dispatch(AuthSliceActions.Login({ user, tokens, rememberMe }));
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
