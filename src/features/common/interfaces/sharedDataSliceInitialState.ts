import { EntityIdType } from "types";
import { FileSizesType } from "../types/fileSizes.type";

export interface ISharedDataSliceInitialState {
  contentInfo: {
    activeFolderId: EntityIdType | null;
    activeFileId: EntityIdType | null;
  };
  filesSizeType: FileSizesType;
}
