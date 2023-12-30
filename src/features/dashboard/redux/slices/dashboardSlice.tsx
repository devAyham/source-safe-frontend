import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthSliceActions } from "features/auth/redux/slices/authSlice";
import { IDashboardSliceInitialState } from "features/dashboard/interfaces/dashboardSliceInitialState.interface";
import {
  DashboardPageAction,
  DashboardPerPageAction,
  DashboardSearchAction,
} from "../actions";
import { IDashboardPayloadAction } from "features/dashboard/interfaces/dashboardSilcePayloadAction.interface";

const initialState: IDashboardSliceInitialState = {
  index: {
    search: "",
    pagnation: { page: 0, perPage: 0 },
  },
  myFolders: {
    pagnation: { page: 1, perPage: 9 },
    search: "",
  },
  showFolder: {
    pagnation: { page: 1, perPage: 9 },
    search: "",
    selectedRows: [],
    selectionMode: false,
  },
  recentActivities: {
    pagnation: { page: 1, perPage: 12 },
    search: "",
  },
  checkIns: {
    pagnation: { page: 1, perPage: 12 },
    search: "",
  },
};
/**
 * @namespace dashboardSlice
 */
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    Reset: () => ({ ...initialState }),
    SetPage: DashboardPageAction,
    SetPerPage: DashboardPerPageAction,
    SetSearch: DashboardSearchAction,
    SetSelectedRows: (state, action: PayloadAction<any[]>) => {
      state.showFolder.selectedRows = action.payload;
    },
    SetSelectionMode: (state, action: PayloadAction<boolean>) => {
      state.showFolder.selectionMode = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(AuthSliceActions.Logout, () => ({
      ...initialState,
    }));
  },
});

export const dashboardReducer = dashboardSlice.reducer;
export const dashboardSliceActions = dashboardSlice.actions;
