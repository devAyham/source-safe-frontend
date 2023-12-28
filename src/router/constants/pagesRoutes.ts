import { EntityIdType } from "types";
import { MainFeaturesRoutes } from "./mainFeaturesRoutes";
import { SubFeaturesRoutes } from "./subFeaturesRoutes";

export const PagesRotes = {
  AuthRoutes: {
    login: `/${MainFeaturesRoutes.Auth}/${SubFeaturesRoutes.Login}`,
    register: `/${MainFeaturesRoutes.Auth}/${SubFeaturesRoutes.Register}`,
  },
  DashboardRoutes: {
    index: `/${MainFeaturesRoutes.DashboardRoute}`,
    MyFolders: {
      index: `/${MainFeaturesRoutes.DashboardRoute}/${SubFeaturesRoutes.MyFolders}`,
      show: (id: EntityIdType) =>
        `/${MainFeaturesRoutes.DashboardRoute}/${SubFeaturesRoutes.MyFolders}/${id}`,
    },
  },
  TrashRoutes: {
    index: `/${MainFeaturesRoutes.TrashRoute}`,
  },
  FoldersRequestsRoutes: {
    index: `/${MainFeaturesRoutes.FoldersRequests}`,
  },
  SharedWithMeRoutes: {
    index: `/${MainFeaturesRoutes.SharedWithMe}`,
    show: (id: EntityIdType) => `/${MainFeaturesRoutes.SharedWithMe}/${id}`,
  },
};
