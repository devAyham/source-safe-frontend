import { createSlice } from "@reduxjs/toolkit";
import { AuthSliceActions } from "features/auth/redux/slices/authSlice";
import { pageAction, perPageAction, searchAction } from "../actions/actions";
import { ISliceInitialState } from "../../interfaces/sliceInitialState/sliceInitialState.interface";

const initialState: ISliceInitialState = {
  index: {
    search: "",
    pagnation: { page: 1, perPage: 9 },
  },
  showFolder: {
    pagnation: { page: 1, perPage: 9 },
    search: "",
  },
};
/**
 * @namespace slice
 */
const slice = createSlice({
  name: "sharedWithMe",
  initialState,
  reducers: {
    Reset: () => ({ ...initialState }),
    SetPage: pageAction,
    SetPerPage: perPageAction,
    SetSearch: searchAction,
  },
  extraReducers(builder) {
    builder.addCase(AuthSliceActions.Logout, () => ({
      ...initialState,
    }));
  },
});

export const reducer = slice.reducer;
export const sliceActions = slice.actions;
