import { AuthStateInterface } from "features/auth/interfaces/AuthStateInterface.d";
import { WritableDraft } from "immer/dist/internal";

export const logoutAction = (state: WritableDraft<AuthStateInterface>) => {
  state.rememberMe = false;
  state.tokens = {
    accessToken: null,
    refreshToken: null,
  };
  state.user = null;
};
