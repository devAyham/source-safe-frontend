import { Route } from "react-router-dom";
import FormLoginPage from "../pages/FormLoginPage/FormLoginPage";
import { MainFeaturesRoutes } from "router/constants/mainFeaturesRoutes";
import { SubFeaturesRoutes } from "router/constants/subFeaturesRoutes";

export default [
  <Route key={MainFeaturesRoutes.Auth} path={MainFeaturesRoutes.Auth}>
    <Route
      key={SubFeaturesRoutes.Login}
      path={SubFeaturesRoutes.Login}
      element={<FormLoginPage />}
    />
    <Route
      key={SubFeaturesRoutes.Register}
      path={SubFeaturesRoutes.Register}
      element={<FormLoginPage />}
    />
  </Route>,
];
