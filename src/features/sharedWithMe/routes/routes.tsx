import { lazy } from "react";
import { Route } from "react-router-dom";
import { MainFeaturesRoutes } from "router/constants/mainFeaturesRoutes";

const SharedWithMeIndexPage = lazy(() => import("../pages/Index/Index"));
const SharedWithMeShowFolderPage = lazy(
  () => import("../pages/ShowFolder/ShowFolder")
);

export default [
  <Route
    key={MainFeaturesRoutes.SharedWithMe}
    path={MainFeaturesRoutes.SharedWithMe}
  >
    <Route
      index
      key={MainFeaturesRoutes.SharedWithMe}
      element={<SharedWithMeIndexPage />}
    />
    <Route key={`:id`} path={`:id`} element={<SharedWithMeShowFolderPage />} />
  </Route>,
];
