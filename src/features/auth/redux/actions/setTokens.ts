import { PayloadAction } from "@reduxjs/toolkit";
import { AuthStateInterface } from "features/auth/interfaces/AuthStateInterface.d";
import { WritableDraft } from "immer/dist/internal";

export const setTokensAction = (
  { tokens }: WritableDraft<AuthStateInterface>,
  action: PayloadAction<Partial<typeof tokens>>
) => {
  tokens.accessToken = action.payload?.accessToken ?? tokens?.accessToken;
  tokens.refreshToken = action.payload?.refreshToken ?? tokens?.refreshToken;
};
