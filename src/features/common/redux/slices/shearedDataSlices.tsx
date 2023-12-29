import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISharedDataSliceInitialState } from "features/common/interfaces/sharedDataSliceInitialState";
import { FileSizesType } from "features/common/types/fileSizes.type";
import { WritableDraft } from "immer/dist/internal";
import { EntityIdType } from "types";

const initialStateForSearedData: ISharedDataSliceInitialState = {
  contentInfo: {
    activeFileId: null,
    activeFolderId: null,
  },
  filesSizeType: "MB",
};
/**
 * @namespace shearedDataSlice
 */
const shearedDataSlice = createSlice({
  name: "ShearedData",
  initialState: initialStateForSearedData,
  reducers: {
    Reset: () => ({ ...initialStateForSearedData }),
    SetFolderId(
      state: WritableDraft<ISharedDataSliceInitialState>,
      action: PayloadAction<EntityIdType | null>
    ) {
      state.contentInfo.activeFolderId = action.payload;
    },
    SetFileId(
      state: WritableDraft<ISharedDataSliceInitialState>,
      action: PayloadAction<EntityIdType | null>
    ) {
      state.contentInfo.activeFileId = action.payload;
    },
    SetFilesSizeType(
      state: WritableDraft<ISharedDataSliceInitialState>,
      action: PayloadAction<FileSizesType>
    ) {
      state.filesSizeType = action.payload;
    },
  },
});

export const SharedDataReducer = shearedDataSlice.reducer;
export const ShearedDataSliceActions = shearedDataSlice.actions;
