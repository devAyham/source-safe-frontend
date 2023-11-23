import { useAppDispatch } from "features/common/hooks/useReduxHooks";
import { useCookies } from "react-cookie";
import { AuthSliceActions } from "../redux/slices/authSlice";
import useHandleUserCredantilesInStorge from "./useHandleUserCredantilesInStorge";

function useOnSucessLogoutHelper() {
  const dispatch = useAppDispatch();
  const { removeUserCredantilesInStorge } = useHandleUserCredantilesInStorge();

  const onSuccessLogout = () => {
    removeUserCredantilesInStorge();
    dispatch(AuthSliceActions.Logout());
  };
  return {
    onSuccessLogout,
  };
}

export default useOnSucessLogoutHelper;
