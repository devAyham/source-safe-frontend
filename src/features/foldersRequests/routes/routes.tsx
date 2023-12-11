import { lazy } from "react";
import { Route } from "react-router-dom";
import { MainFeaturesRoutes } from "router/constants/mainFeaturesRoutes";

const FolderRequestsIndex = lazy(() => import("../pages/Index/IndexPage"));

export default [
  <Route
    key={MainFeaturesRoutes.FoldersRequests}
    path={MainFeaturesRoutes.FoldersRequests}
  >
    <Route
      index
      key={MainFeaturesRoutes.FoldersRequests}
      element={<FolderRequestsIndex />}
    />
  </Route>,
];
