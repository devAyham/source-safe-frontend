import { useAppDispatch } from "features/common/hooks/useReduxHooks";
import { AuthSliceActions } from "../redux/slices/authSlice";
import { AuthStateInterface } from "../interfaces/AuthStateInterface.d";
import useNavigateFromState from "./useNavigateFromState";
/**
 *
 * @returns
 */
export const useGetAccessWithoutLogin = () => {
  const dispatch = useAppDispatch();
  const { navigateFromState } = useNavigateFromState();

  const getAccessWithoutLogin = (userData: AuthStateInterface) => {
    dispatch(AuthSliceActions.Login(userData));
    navigateFromState();
  };
  return { getAccessWithoutLogin };
};
