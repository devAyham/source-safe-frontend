import { ReactNode } from "react";
import { MainFeaturesRoutes } from "router/constants/mainFeaturesRoutes";

export interface Props {
  routeKey: MainFeaturesRoutes;
  active: boolean;
  icon : ReactNode
}
