import { MainFeaturesRoutes } from "./mainFeaturesRoutes";
import { SubFeaturesRoutes } from "./subFeaturesRoutes";

export const PagesRotes = {
  AuthRoutes: {
    login: `/${MainFeaturesRoutes.Auth}/${SubFeaturesRoutes.Login}`,
    register: `/${MainFeaturesRoutes.Auth}/${SubFeaturesRoutes.Register}`,
  },
  DashboardRoutes: {
    index: `/${MainFeaturesRoutes.DashboardRoute}`,
  },
  TrashRoutes: {
    index: `/${MainFeaturesRoutes.TrashRoute}`,
  },
  FoldersRequestsRoutes: {
    index: `/${MainFeaturesRoutes.FoldersRequests}`,
  },
  SharedWithMeRoutes: {
    index: `/${MainFeaturesRoutes.SharedWithMe}`,
  },
};
