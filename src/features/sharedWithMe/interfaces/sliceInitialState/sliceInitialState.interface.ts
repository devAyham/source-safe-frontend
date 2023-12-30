import { SharedWithMePagesType } from "features/sharedWithMe/types/sharedWithMePages.type";
import { IInitialStateCrud } from "interfaces/InitialStateCrud.interface";

export type ISliceInitialState = {
  [key in SharedWithMePagesType]: Pick<
    IInitialStateCrud,
    "search" | "pagnation"
  > &
    Partial<Pick<IInitialStateCrud, "selectedRows" | "selectionMode">>;
};
