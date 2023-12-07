import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "features/common/redux/slices/uiSlices";
import authReducer from "features/auth/redux/slices/authSlice";
import { dashboardReducer } from "features/dashboard/redux/slices/dashboardSlice";

/**
 * @description the redux store
 * @namespace store
 */
const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
