import { MainFeaturesRoutes } from "./mainFeaturesRoutes";
import { SubFeaturesRoutes } from "./subFeaturesRoutes";

export const PagesRotes = {
  AuthRoutes: {
    login: `/${MainFeaturesRoutes.Auth}/${SubFeaturesRoutes.Login}`,
    register: `/${MainFeaturesRoutes.Auth}/${SubFeaturesRoutes.Register}`,
  },
  DashboardRoutes: {},
};
