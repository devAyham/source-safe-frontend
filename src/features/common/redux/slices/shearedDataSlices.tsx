import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";

const initialStateForSearedData: { data: any } = {
  data: {},
};
/**
 * @namespace shearedDataSlice
 */
const shearedDataSlice = createSlice({
  name: "ShearedData",
  initialState: initialStateForSearedData,
  reducers: {
    Reset: () => ({ ...initialStateForSearedData }),
    SetData(state: WritableDraft<{ data: any }>, action: PayloadAction<any>) {
      state.data = action.payload;
    },
  },
});

export default shearedDataSlice.reducer;
export const ShearedDataSliceActions = shearedDataSlice.actions;
