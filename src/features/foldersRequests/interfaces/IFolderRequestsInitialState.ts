import { IInitialStateCrud } from "interfaces/InitialStateCrud.interface";

export interface IFolderRequestsInitialState
  extends Pick<IInitialStateCrud, "search" | "pagnation"> {}
