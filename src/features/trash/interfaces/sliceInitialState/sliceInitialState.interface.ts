import { trashPagesType } from "features/trash/types/trashPages.type";
import { IInitialStateCrud } from "interfaces/InitialStateCrud.interface";

export type ISliceInitialState = {
  [key in trashPagesType]: Pick<
    IInitialStateCrud,
    "search" | "pagnation"
  >;
};
