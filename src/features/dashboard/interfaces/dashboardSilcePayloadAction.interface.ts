import { PayloadAction } from "@reduxjs/toolkit";
import { DashboardPagesType } from "../types/dashboardPages.type";

export interface IDashboardPayloadAction<P = string>
  extends PayloadAction<{ resource: DashboardPagesType; value: P }> {}
