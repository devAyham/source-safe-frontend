import {
  pageAction,
  filtersAction,
  isEditingAction,
  perPageAction,
  searchAction,
  sorterAction,
  viewContentAction,
} from "redux/actions/globalActions";
import {
  viewAction,
  chekAllRowsAction,
  deletedRowsAction,
  selectedRowsAction,
  selectionModeAction,
} from "./crudActions";

export const actionCreatorsObject = {
  pageAction,
  perPageAction,
  filtersAction,
  sorterAction,
  isEditingAction,
  searchAction,
  viewContentAction,
  viewAction,
  deletedRowsAction,
  chekAllRowsAction,
  selectionModeAction,
  selectedRowsAction,
};
