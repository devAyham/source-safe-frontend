import FourOThreePage from "features/common/Errors/403/403";
import FourOFourPage from "features/common/Errors/404/404";
import FiveOO from "features/common/Errors/500/500";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { Outlet } from "react-router-dom";

/**
 * @description Error handeler middleware
 */
export const ErrorRoutes = () => {
  const { errors } = useAppSelector((state) => state.ui);
  console.log(errors);

  if (errors && errors.navigate) {
    switch (errors.code) {
      case 404:
        return <FourOFourPage />;
      case 403:
        return <FourOThreePage />;
      default:
        return <FiveOO />;
    }
  } else {
    return <Outlet />;
  }
};
