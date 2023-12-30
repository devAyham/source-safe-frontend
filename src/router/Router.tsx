import AuthRoutes from "features/auth/routes/AuthRoutes";

import FourOFourPage from "features/common/Errors/404/404";
import SuspenseLoading from "features/common/components/Loading/SuspenseLoading/SuspenseLoading";
import { DashboardRoutes } from "features/dashboard/routes";
import { MainLayout } from "layouts";
import { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AuthenticatedRoutes } from "./middlewares/AuthenticatedRoutes";
import { ErrorRoutes } from "./middlewares/ErrorRoutes";
import { UnAuthenticatedRoutes } from "./middlewares/UnAuthenticatedRoutes";
import { FolderRequestsRoutes } from "features/foldersRequests/routes";
import { SharedWIthMeRoutes } from "features/sharedWithMe/routes";
import { TrashRoutes } from "features/trash/routes";
import { PagesRotes } from "./constants/pagesRoutes";
import { AnimatePresence } from "framer-motion";
// import CustomErrorBoundary from "features/common/Errors/CustomErrorBoundary/CustomErrorBoundary";

/**
 * @description The Main Router
 */
const MainRouter = () => {
  const location = useLocation();
  return (
    // <CustomErrorBoundary>
    <Suspense fallback={<SuspenseLoading />}>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route
            key={"UnAuthenticatedRoutes"}
            element={<UnAuthenticatedRoutes />}
          >
            {AuthRoutes}
          </Route>
          <Route key={"AuthenticatedRoutes"} element={<AuthenticatedRoutes />}>
            <Route
              path="/"
              element={
                <MainLayout indexPage={PagesRotes.DashboardRoutes.index} />
              }
            >
              <Route element={<ErrorRoutes />}>
                {DashboardRoutes}
                {FolderRequestsRoutes}
                {SharedWIthMeRoutes}
                {TrashRoutes}
                <Route path="*" element={<FourOFourPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
    // </CustomErrorBoundary>
  );
};
export default MainRouter;
