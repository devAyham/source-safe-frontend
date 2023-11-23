import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthStateInterface} from "features/auth/interfaces/AuthStateInterface.d";
import {WritableDraft} from "immer/dist/internal";

const initialState: AuthStateInterface = {
  rememberMe: false,
  userInfo: null,
  token: null,
};

const loginAction = (
  state: WritableDraft<AuthStateInterface>,
  action: PayloadAction<AuthStateInterface>
) => {
  state.token = action.payload.token;
  state.userInfo = action.payload.userInfo;
  state.rememberMe = action.payload.rememberMe;
};
/**
 * @namespace authSlice
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login: loginAction,
    Logout: () => ({ ...initialState }),
    SetRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
    SetToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
});

export default authSlice.reducer;
export const AuthSliceActions = authSlice.actions;
