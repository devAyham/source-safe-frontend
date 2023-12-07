import { CustomEndPoints } from "api/constants/customEndPoints";
import { showErrorMessage } from "api/helpers/showErrorMessage";
import { AxiosError } from "axios";
import useHandleUserCredantilesInStorge from "features/auth/hooks/useHandleUserCredantilesInStorge";
import { AuthSliceActions } from "features/auth/redux/slices/authSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { Axios } from "libs/axios";
import { useNavigate } from "react-router-dom";
import { PagesRotes } from "router/constants/pagesRoutes";
import { AuthServiceName } from "services/authService";

export const useRefreshToken = () => {
  const navigate = useNavigate();
  const { tokens } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { removeUserCredantilesInStorge } = useHandleUserCredantilesInStorge();
  const getNewTokens = async () => {
    const res = await Axios({
      method: "POST",
      //need service name
      url: `${AuthServiceName}/${CustomEndPoints.Refresh}`,
      data: {
        refresh: tokens.refreshToken,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err: AxiosError) => {
        if (err) {
          showErrorMessage(err.message);
          navigate(PagesRotes.AuthRoutes.login);
          removeUserCredantilesInStorge();
          dispatch(AuthSliceActions.Logout());
        }
      });
    if (res) {
      const tokens = res.data.data;
      dispatch(
        AuthSliceActions.SetTokens({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        })
      );
      return tokens;
    }
  };
  return { getNewTokens };
};
