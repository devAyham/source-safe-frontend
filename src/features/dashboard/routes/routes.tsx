import { Route } from "react-router-dom";
import { MainFeaturesRoutes } from "router/constants/mainFeaturesRoutes";
import { SubFeaturesRoutes } from "router/constants/subFeaturesRoutes";
import { lazy } from "react";

const DashboardPage = lazy(() => import("../pages/Dashboard/Dashboard"));
const MyFolders = lazy(() => import("../pages/MyFolders/MyFolders"));
export default [
  <Route
    key={MainFeaturesRoutes.DashboardRoute}
    path={MainFeaturesRoutes.DashboardRoute}
  >
    <Route
      index
      key={MainFeaturesRoutes.DashboardRoute}
      element={<DashboardPage />}
    />
    <Route
      key={SubFeaturesRoutes.MyFolders}
      path={SubFeaturesRoutes.MyFolders}
      element={<MyFolders />}
    />
  </Route>,
];
