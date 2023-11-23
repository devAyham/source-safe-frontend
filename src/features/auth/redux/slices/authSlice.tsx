import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthStateInterface } from "features/auth/interfaces/AuthStateInterface.d";
import { WritableDraft } from "immer/dist/internal";
import { loginAction } from "../actions/login";
import { logoutAction } from "../actions/logout";
import { setRememberMeAction } from "../actions/setRememberMe";
import { setTokensAction } from "../actions/setTokens";

const initialState: AuthStateInterface = {
  rememberMe: false,
  user: null,
  tokens: {
    accessToken: null,
    refreshToken: null,
  },
};

/**
 * @namespace authSlice
 */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login: loginAction,
    Logout: logoutAction,
    SetRememberMe: setRememberMeAction,
    SetTokens: setTokensAction,
  },
});

export default authSlice.reducer;
export const AuthSliceActions = authSlice.actions;
