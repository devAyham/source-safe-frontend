import { showErrorMessage } from "api/helpers/showErrorMessage";
import useHandleUserCredantilesInStorge from "features/auth/hooks/useHandleUserCredantilesInStorge";
import { AuthSliceActions } from "features/auth/redux/slices/authSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { Axios } from "libs/axios";
import { useNavigate } from "react-router-dom";

export const useRefreshToken = () => {
  const navigate = useNavigate();
  const { tokens } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { removeUserCredantilesInStorge } = useHandleUserCredantilesInStorge();
  const getNewTokens = async () => {
    const res = await Axios({
      method: "POST",
      //need service name
      url: `/token-refresh`,
      data: {
        refresh: tokens.refreshToken,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          showErrorMessage(err);
          removeUserCredantilesInStorge();
          dispatch(AuthSliceActions.Logout());
          navigate("/auth/formLogin");
        }
      });
    if (res) {
      console.log(res);
      dispatch(AuthSliceActions.SetTokens(res.data.tokens));
      return res.data;
    }
  };
  return { getNewTokens };
};
