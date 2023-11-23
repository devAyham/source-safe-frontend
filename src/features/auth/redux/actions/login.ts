import { PayloadAction } from "@reduxjs/toolkit";
import { AuthStateInterface } from "features/auth/interfaces/AuthStateInterface.d";
import { WritableDraft } from "immer/dist/internal";

export const loginAction = (
  state: WritableDraft<AuthStateInterface>,
  action: PayloadAction<AuthStateInterface>
) => {
  state.tokens = action.payload.tokens;
  state.user = action.payload.user;
  state.rememberMe = action.payload.rememberMe;
};