import { PayloadAction } from "@reduxjs/toolkit";
import { trashPagesType } from "features/trash/types/trashPages.type";

export interface ISlicePayloadAction<P = string>
  extends PayloadAction<{ resource: trashPagesType; value: P }> {}
