import { message } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { AuthSliceActions } from "features/auth/redux/slices/authSlice";
import { ArgsProps } from "antd/es/message";
import { UiSliceActions } from "../redux/slices/uiSlices";
import useHandleUserCredantilesInStorge from "features/auth/hooks/useHandleUserCredantilesInStorge";

const ERR = {
  NOT_FOUND: 404,
  UNAUTHORIZED: 403,
  UNAUTHENTICATED: 401,
  SERVER_ERROR: 500,
  UNPROCESSABLE_CONTENT: 422,
  NETWORK: "ERR_NETWORK",
};
/**
 *
 * @description a hook that used to handle all the app errors and store it in redux slice if it is needed
 * with redirects options or just a messages errors handle
 */
export const useErrorHandler = () => {
  const navigate = useNavigate();
  const { errors } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const { removeUserCredantilesInStorge } = useHandleUserCredantilesInStorge();

  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      dispatch(UiSliceActions.SetError(null));
    }, 250);
  }, [location]);

  useEffect(() => {
    if (errors) {
      if (!errors.navigate) {
        let config: ArgsProps = {
          type: errors.type ?? "error",
          content: "",
          duration: 3,
        };
        switch (errors.code) {
          case ERR.NOT_FOUND:
            config.content = errors.message;
            break;
          case ERR.UNAUTHORIZED:
            config.content = errors.message;
            break;
          case ERR.UNAUTHENTICATED: {
            config.content = errors.message;
            removeUserCredantilesInStorge();
            dispatch(AuthSliceActions.Logout());
            navigate("/auth/formLogin");
            break;
          }
          case ERR.SERVER_ERROR:
            config.content = errors.message;
            break;
          case ERR.UNPROCESSABLE_CONTENT:
            config.content = errors.message;
            break;
          default: {
            config.content = errors.message;
            throw new Error();
          }
        }
        message.open(config);
      }
    }
    return;
  }, [errors]);
};
