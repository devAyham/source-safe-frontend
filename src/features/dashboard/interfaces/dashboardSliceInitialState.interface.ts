import { IInitialStateCrud } from "interfaces/InitialStateCrud.interface";
import { DashboardPagesType } from "../types/dashboardPages.type";

export type IDashboardSliceInitialState = {
  [key in DashboardPagesType]: Pick<IInitialStateCrud, "search" | "pagnation"> &
    Partial<Pick<IInitialStateCrud, "selectedRows" | "selectionMode">>;
};

// export interface IDashboardSliceInitialState {
//   index: Pick<IInitialStateCrud, "search" | "pagnation">;
//   myFolders: Pick<IInitialStateCrud, "search" | "pagnation">;
//   recentActivities: Pick<IInitialStateCrud, "search" | "pagnation">;
// }
