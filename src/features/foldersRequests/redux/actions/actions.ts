import { PayloadAction } from "@reduxjs/toolkit";
import { IDashboardPayloadAction } from "features/dashboard/interfaces/dashboardSilcePayloadAction.interface";
import { IFolderRequestsInitialState } from "features/foldersRequests/interfaces/IFolderRequestsInitialState";
import { WritableDraft } from "immer/dist/internal";

export const pageAction = (
  state: WritableDraft<IFolderRequestsInitialState>,
  action: PayloadAction<number>
) => {
  state.pagnation.page = action.payload;
};
export const perPageAction = (
  state: WritableDraft<IFolderRequestsInitialState>,
  action: PayloadAction<number>
) => {
  state.pagnation.perPage = action.payload;
};
export const searchAction = (
  state: WritableDraft<IFolderRequestsInitialState>,
  action: PayloadAction<string>
) => {
  state.search = action.payload;
};
