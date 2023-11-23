import { MainFeaturesRoutes } from "./mainFeaturesRoutes";
import { SubFeaturesRoutes } from "./subFeaturesRoutes";

export const PagesRotes = {
  DashboardRoutes: {
    ContactTypes: {
      index: `/${MainFeaturesRoutes.DashboardRoute}/${SubFeaturesRoutes.ContactsTypes}`,
    },
    WorkPlacesTypes: {
      index: `/${MainFeaturesRoutes.DashboardRoute}/${SubFeaturesRoutes.WorkplaceType}`,
    },
  },
};
