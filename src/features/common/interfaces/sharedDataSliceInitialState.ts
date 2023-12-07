import { EntityIdType } from "types";

export interface ISharedDataSliceInitialState {
  contentInfo: {
    activeFolderId: EntityIdType | null;
    activeFileId: EntityIdType | null;
  } ;
}
