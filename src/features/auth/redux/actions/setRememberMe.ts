import { PayloadAction } from "@reduxjs/toolkit";
import { AuthStateInterface } from "features/auth/interfaces/AuthStateInterface.d";
import { WritableDraft } from "immer/dist/internal";

export const setRememberMeAction = (
  state: WritableDraft<AuthStateInterface>,
  action: PayloadAction<boolean>
) => {
  state.rememberMe = action.payload;
};
