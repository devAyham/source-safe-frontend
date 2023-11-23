import { IInitialStateCrud } from "interfaces/InitialStateCrud.interface";
import { actionCreatorsObject } from "../actions/actionCreatorsObject";

export type KeyofCrudActionMethods = keyof typeof actionCreatorsObject;

export const stateKeysAndActionCreatorKeysMatcher: {
  [key in keyof IInitialStateCrud]:
    | KeyofCrudActionMethods
    | KeyofCrudActionMethods[];
} = {
  checkAllRows: "chekAllRowsAction",
  deletedRows: "deletedRowsAction",
  filters: "filtersAction",
  modalConfig: "isEditingAction",
  pagnation: ["pageAction", "perPageAction"],
  search: "searchAction",
  selectedRows: "selectedRowsAction",
  selectionMode: "selectionModeAction",
  sorter: "sorterAction",
  view: "viewAction",
};
