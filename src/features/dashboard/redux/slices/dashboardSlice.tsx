import { createSlice } from "@reduxjs/toolkit";
import { AuthSliceActions } from "features/auth/redux/slices/authSlice";
import { IDashboardSliceInitialState } from "features/dashboard/interfaces/dashboardSliceInitialState.interface";
import {
  DashboardPageAction,
  DashboardPerPageAction,
  DashboardSearchAction,
} from "../actions";

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
  },
  recentActivities: {
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
  },
  extraReducers(builder) {
    builder.addCase(AuthSliceActions.Logout, () => ({
      ...initialState,
    }));
  },
});

export const dashboardReducer = dashboardSlice.reducer;
export const dashboardSliceActions = dashboardSlice.actions;
