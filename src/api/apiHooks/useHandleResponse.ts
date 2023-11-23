import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { HttpStatus } from "../constants/httpStatusCodes";
import { AuthSliceActions } from "../../features/auth/redux/slices/authSlice";
import useHandleUserCredantilesInStorge from "../../features/auth/hooks/useHandleUserCredantilesInStorge";
import { useAppDispatch } from "../../features/common/hooks/useReduxHooks";

type ErrorData = {
  [key: string]: string[];
};

export type ErrorResponse = {
  status?: number;
  errors?: ErrorData;
  message?: string;
};

type SuccessResponse = any;
type HandleReturnType = {
  handleError: (error: ErrorResponse, navigateTo?: string) => void;
  handleSuccess: (res: SuccessResponse, successMessage?: string) => void;
};

export const useHandle = (): HandleReturnType => {
  const { removeUserCredantilesInStorge } = useHandleUserCredantilesInStorge();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const showErrorMessage = (message: string) => {
    notification.error({
      message,
      duration: 4,
    });
  };
  const showSuccessMessage = (message: string) => {
    notification.success({
      message,
      duration: 3,
    });
  };

  const handleError = (error: any, navigateTo?: string) => {
    const statusCode = error?.response?.status;
    const errorMessage = error?.response?.data.message;

    if (statusCode && Object.values(HttpStatus).includes(statusCode)) {
      switch (statusCode) {
        // Handle Unauthorized error
        case HttpStatus.Unauthorized:
          showErrorMessage(errorMessage);
          removeUserCredantilesInStorge();
          dispatch(AuthSliceActions.Logout());
          navigate("/auth/formLogin");

          break;
        case HttpStatus.Forbidden:
          //NOTE - fixed by ayham becuase this message is wronge
          showErrorMessage(errorMessage);
          // showErrorMessage("you can't remove this item , another items depend on it");
          // Handle Forbidden error
          break;
        case HttpStatus.UnprocessableEntity:
          showErrorMessage(errorMessage);
          break;
        case HttpStatus.BadRequest:
          showErrorMessage(errorMessage);
          break;
        default:
          // Handle other Http errors
          showErrorMessage("Network Error");
          break;
      }
    } else if (errorMessage) {
      showErrorMessage(errorMessage);
    } else if (error.message) {
      showErrorMessage(error.message);
    }
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  const handleSuccess = (res: SuccessResponse, successMessage?: string) => {
    if (successMessage) {
      showSuccessMessage(successMessage);
    }
  };

  return {
    handleError,
    handleSuccess,
  };
};
