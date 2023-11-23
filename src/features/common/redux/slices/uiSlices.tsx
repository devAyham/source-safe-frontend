import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorHandlerInterface } from "features/common/interfaces/ErrorHandlerInterface.d";
import { InitialStateUiInterface } from "features/common/interfaces/InitialStateUiInterface.d";
import { DisplayTypes } from "features/common/types/DisplayTypes.d";
import { LanguageTypes } from "features/common/types/LanguageTypes.d";
import { WritableDraft } from "immer/dist/internal";

const initialStateForUi: InitialStateUiInterface = {
  disaplay: "isDesktop ",
  language: "en",
  theme: "purple",
  direction: "ltr",
  errors: null,
  loading: false,
  FCMtoken: null,
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
    ChangeLanguage: (
      state: WritableDraft<InitialStateUiInterface>,
      action: PayloadAction<LanguageTypes>
    ) => {
      state.language = action.payload;
      state.direction = action.payload === "ar" ? "rtl" : "ltr";
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
    SetFCMtoken: (state, action: PayloadAction<string | null | false>) => {
      state.FCMtoken = action.payload;
    },
    SetDeferredPrompt: (state, action: PayloadAction<any>) => {
      state.deferredPrompt = action.payload;
    },
  },
});

export default uiSlice.reducer;
export const UiSliceActions = uiSlice.actions;
