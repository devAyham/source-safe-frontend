import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorHandlerInterface } from "features/common/interfaces/ErrorHandlerInterface.d";
import { InitialStateUiInterface } from "features/common/interfaces/InitialStateUiInterface.d";
import { DisplayTypes } from "features/common/types/DisplayTypes.d";
import { LanguageTypes } from "features/common/types/LanguageTypes.d";
import { WritableDraft } from "immer/dist/internal";

const initialStateForUi: InitialStateUiInterface = {
  disaplay: "isDesktop ",
  theme: "purple",
  errors: null,
  loading: false,
  deferredPrompt: null,
};
/**
 * @namespace uiSlice
 * @description the ui slice that have all golbal ui states like lang, dir ,theme, display type , loading ,errors ..etc
 */

const uiSlice = createSlice({
  name: "UI",
  initialState: initialStateForUi,
  reducers: {
    Reset: () => ({ ...initialStateForUi }),
    ChangeDisplay: (
      state: WritableDraft<InitialStateUiInterface>,
      action: PayloadAction<DisplayTypes>
    ) => {
      state.disaplay = action.payload;
    },
    ChangeTheme: (
      state: WritableDraft<InitialStateUiInterface>,
      action: PayloadAction<"purple" | "green">
    ) => {
      state.theme = action.payload;
    },
    SetLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    SetError: (state, action: PayloadAction<ErrorHandlerInterface | null>) => {
      state.errors = action.payload;
    },
    SetDeferredPrompt: (state, action: PayloadAction<any>) => {
      state.deferredPrompt = action.payload;
    },
  },
});

export default uiSlice.reducer;
export const UiSliceActions = uiSlice.actions;
