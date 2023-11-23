import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { FilterType } from "../../features/common/interfaces/FilterInterface.d";
import { SorterInterface } from "../../features/common/interfaces/SorterInterface.d";
import { viewContentTypes } from "features/common/types/viewContentTypes.d";
import { IInitialStateCrud } from "interfaces/InitialStateCrud.interface";
import { viewTypeTypes } from "features/common/types/viewTypeTypes.d";
import { IModalConfig } from "features/common/interfaces/ModalConfig.interface";

/**
 * a global redux dispatch actions that will used in many places
 * @module globalActions
 */

export const pageAction = (
  state: WritableDraft<
    Partial<IInitialStateCrud> & Pick<IInitialStateCrud, "pagnation">
  >,
  action: PayloadAction<number>
) => {
  state.pagnation.page = action.payload;
};
export const perPageAction = (
  state: WritableDraft<
    Partial<IInitialStateCrud> & Pick<IInitialStateCrud, "pagnation">
  >,
  action: PayloadAction<number>
) => {
  state.pagnation.perPage = action.payload;
};
export const filtersAction = (
  state: WritableDraft<Partial<IInitialStateCrud>>,
  action: PayloadAction<FilterType | null>
) => {
  state.filters = action.payload;
};
export const sorterAction = (
  state: WritableDraft<Partial<IInitialStateCrud>>,
  action: PayloadAction<SorterInterface>
) => {
  state.sorter = action.payload;
};
export const isEditingAction = (
  state: WritableDraft<Partial<IInitialStateCrud>>,
  action: PayloadAction<IModalConfig>
) => {
  state.modalConfig = action.payload;
};
export const searchAction = (
  state: WritableDraft<Partial<IInitialStateCrud>>,
  action: PayloadAction<string>
) => {
  state.search = action.payload;
};
export const viewContentAction = (
  state: WritableDraft<any>,
  action: PayloadAction<viewContentTypes>
) => {
  state.viewContent = action.payload;
  state.filters = null;
};



