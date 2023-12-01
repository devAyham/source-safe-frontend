import { ReactNode } from "react";
import { MainFeaturesRoutes } from "router/constants/mainFeaturesRoutes";
import { SubFeaturesRoutes } from "router/constants/subFeaturesRoutes";

export interface Props {
  routeKey: SubFeaturesRoutes;
  icon: ReactNode;
  text: string;
}
