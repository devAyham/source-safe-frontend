import AuthRoutes from "features/auth/routes/AuthRoutes";

import FourOFourPage from "features/common/Errors/404/404";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "./middlewares/AuthenticatedRoutes";
import { AuthorizedRoutes } from "./middlewares/AuthorizedRoutes";
import { ErrorRoutes } from "./middlewares/ErrorRoutes";
import { UnAuthenticatedRoutes } from "./middlewares/UnAuthenticatedRoutes";
import SuspenseLoading from "features/common/components/Loading/SuspenseLoading/SuspenseLoading";
import { MainLayout } from "layouts";
import { MainFeaturesRoutes } from "./constants/mainFeaturesRoutes";
// import CustomErrorBoundary from "features/common/Errors/CustomErrorBoundary/CustomErrorBoundary";

/**
 * @description The Main Router
 */
const MainRouter = () => {
  return (
    // <CustomErrorBoundary>
    <Suspense fallback={<SuspenseLoading />}>
      <Routes>
        <Route
          key={"UnAuthenticatedRoutes"}
          element={<UnAuthenticatedRoutes />}
        >
          {AuthRoutes}
        </Route>
        <Route key={"AuthenticatedRoutes"} element={<AuthenticatedRoutes />}>
          <Route path="/" element={<MainLayout />}>
            <Route path={MainFeaturesRoutes.DashboardRoute} element={<></>} />
            <Route element={<ErrorRoutes />}>
              <Route path="*" element={<FourOFourPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
    // </CustomErrorBoundary>
  );
};
export default MainRouter;
