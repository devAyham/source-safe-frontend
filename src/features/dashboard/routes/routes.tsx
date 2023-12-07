import { Route } from "react-router-dom";
import { MainFeaturesRoutes } from "router/constants/mainFeaturesRoutes";
import { SubFeaturesRoutes } from "router/constants/subFeaturesRoutes";
import { lazy } from "react";

const DashbaordIndexPage = lazy(() => import("../pages/Index"));
const MyFoldersPage = lazy(() => import("../pages/MyFolders/MyFolders"));
const ShowFolderPage = lazy(() => import("../pages/ShowFolder/ShowFolder"));

export default [
  <Route
    key={MainFeaturesRoutes.DashboardRoute}
    path={MainFeaturesRoutes.DashboardRoute}
  >
    <Route
      index
      key={MainFeaturesRoutes.DashboardRoute}
      element={<DashbaordIndexPage />}
    />
    <Route
      key={SubFeaturesRoutes.MyFolders}
      path={SubFeaturesRoutes.MyFolders}
      element={<MyFoldersPage />}
    />
    <Route
      key={`${SubFeaturesRoutes.MyFolders}/:id`}
      path={`${SubFeaturesRoutes.MyFolders}/:id`}
      element={<ShowFolderPage />}
    />
  </Route>,
];
