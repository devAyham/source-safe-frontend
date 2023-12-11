import { createSlice } from "@reduxjs/toolkit";
import { AuthSliceActions } from "features/auth/redux/slices/authSlice";
import { IFolderRequestsInitialState } from "features/foldersRequests/interfaces/IFolderRequestsInitialState";
import {
  FolderRequestsPageAction,
  FolderRequestsPerPageAction,
  FolderRequestsSearchAction,
} from "../actions";

const initialState: IFolderRequestsInitialState = {
  pagnation: { page: 1, perPage: 9 },
  search: "",
};
/**
 * @namespace foldersRequestsSlice
 */
const foldersRequestsSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    Reset: () => ({ ...initialState }),
    SetPage: FolderRequestsPageAction,
    SetPerPage: FolderRequestsPerPageAction,
    SetSearch: FolderRequestsSearchAction,
  },
  extraReducers(builder) {
    builder.addCase(AuthSliceActions.Logout, () => ({
      ...initialState,
    }));
  },
});

export const folderRequestReducer = foldersRequestsSlice.reducer;
export const foldersRequestsSliceActions = foldersRequestsSlice.actions;
