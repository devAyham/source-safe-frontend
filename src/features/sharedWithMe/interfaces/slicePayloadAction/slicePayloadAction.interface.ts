import { PayloadAction } from "@reduxjs/toolkit";
import { SharedWithMePagesType } from "features/sharedWithMe/types/sharedWithMePages.type";

export interface ISlicePayloadAction<P = string>
  extends PayloadAction<{ resource: SharedWithMePagesType; value: P }> {}
