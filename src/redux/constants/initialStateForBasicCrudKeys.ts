import { IInitialStateCrud } from "interfaces/InitialStateCrud.interface";

export const initialStateForBasicCrudKeys: (keyof IInitialStateCrud)[] = [
  "checkAllRows",
  "deletedRows",
  "filters",
  "modalConfig",
  "pagnation",
  "search",
  "selectedRows",
  "selectionMode",
  "sorter",
  "view",
];
