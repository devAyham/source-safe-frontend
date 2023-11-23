import { PayloadAction } from "@reduxjs/toolkit";
import { IInitialStateCrud } from "interfaces/InitialStateCrud.interface";
import { WritableDraft } from "immer/dist/internal";
import { viewTypeTypes } from "../../features/common/types/viewTypeTypes.d";

export const viewAction = (
  state: WritableDraft<Partial<IInitialStateCrud>>,
  action: PayloadAction<viewTypeTypes>
) => {
  state.view = action.payload;
};
export const deletedRowsAction = (
  state: WritableDraft<Partial<IInitialStateCrud>>,
  action: PayloadAction<boolean>
) => {
  state.deletedRows = action.payload;
};
export const chekAllRowsAction = (
  state: WritableDraft<Partial<IInitialStateCrud>>,
  action: PayloadAction<boolean>
) => {
  state.checkAllRows = action.payload;
};
export const selectionModeAction = (
  state: WritableDraft<Partial<IInitialStateCrud>>,
  action: PayloadAction<boolean>
) => {
  state.selectionMode = action.payload;
};
export const selectedRowsAction = (
  state: WritableDraft<Partial<IInitialStateCrud>>,
  action: PayloadAction<number[]>
) => {
  state.selectedRows = action.payload;
};

// export const setTypeAction = (
//     state: WritableDraft<InitialStateTypesInterface>,
//     action: PayloadAction<DashTypesType>
//   ) => {
//     state.type = action.payload;
//   };
