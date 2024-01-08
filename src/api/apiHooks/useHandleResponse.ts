import { showErrorMessage } from "api/helpers/showErrorMessage";
import { showSuccessMessage } from "api/helpers/showSuccessMessage";
import {
  useAppDispatch
} from "features/common/hooks/useReduxHooks";
import { UiSliceActions } from "features/common/redux/slices/uiSlices";
import { useNavigate } from "react-router-dom";
import { HttpStatus } from "../constants/httpStatusCodes";

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
  const navigate = useNavigate();
  const { SetError } = UiSliceActions;
  const dispatch = useAppDispatch();
  const handleError = (error: any, navigateTo?: string) => {
    const statusCode = error?.response?.status;
    const errorMessage = error?.response?.data?.message;
    if (error?.response?.config?.method === "get") {
      dispatch(
        SetError({
          code: statusCode,
          message: errorMessage,
          navigate: true,
        })
      );
    }

    if (statusCode && Object.values(HttpStatus).includes(statusCode)) {
      switch (statusCode) {
        // Handle Unauthorized error for access token
        case HttpStatus.Unauthorized:
          showErrorMessage(errorMessage);
          break;
        case HttpStatus.Forbidden:
          showErrorMessage(errorMessage);
          break;
        case HttpStatus.UnprocessableEntity:
          showErrorMessage(errorMessage);
          break;
        case HttpStatus.BadRequest:
          showErrorMessage(errorMessage);
          break;
        case HttpStatus.NotFound:
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
