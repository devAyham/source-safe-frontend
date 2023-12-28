import { lazy } from "react";
import { Route } from "react-router-dom";
import { MainFeaturesRoutes } from "router/constants/mainFeaturesRoutes";

const TrashIndexPage = lazy(() => import("../pages/Index/Index"));

export default [
  <Route
    key={MainFeaturesRoutes.TrashRoute}
    path={MainFeaturesRoutes.TrashRoute}
  >
    <Route
      index
      key={MainFeaturesRoutes.TrashRoute}
      element={<TrashIndexPage />}
    />
  </Route>,
];
