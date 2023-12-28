import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "features/common/redux/slices/uiSlices";
import authReducer from "features/auth/redux/slices/authSlice";
import { dashboardReducer } from "features/dashboard/redux/slices/dashboardSlice";
import { SharedDataReducer } from "features/common/redux/slices/shearedDataSlices";
import { folderRequestReducer } from "features/foldersRequests/redux/slices/folderRequestsSlice";
import { SharedWithMeReducer } from "features/sharedWithMe/redux";
import { TrashReducer } from "features/trash/redux";

/**
 * @description the redux store
 * @namespace store
 */
const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    sharedData: SharedDataReducer,
    folderRequest: folderRequestReducer,
    sharedWithMe: SharedWithMeReducer,
    trash: TrashReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
