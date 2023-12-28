import {
  ISharedWithMeSliceInitialState,
  ISharedWithMeSlicePayloadAction,
} from "features/sharedWithMe/interfaces";
import { WritableDraft } from "immer/dist/internal";

export const pageAction = (
  state: WritableDraft<ISharedWithMeSliceInitialState>,
  action: ISharedWithMeSlicePayloadAction<number>
) => {
  if (state[action.payload.resource].pagnation)
    state[action.payload.resource].pagnation.page = action.payload.value;
};
export const perPageAction = (
  state: WritableDraft<ISharedWithMeSliceInitialState>,
  action: ISharedWithMeSlicePayloadAction<number>
) => {
  if (state[action.payload.resource].pagnation)
    state[action.payload.resource].pagnation.perPage = action.payload.value;
};
export const searchAction = (
  state: WritableDraft<ISharedWithMeSliceInitialState>,
  action: ISharedWithMeSlicePayloadAction<string>
) => {
  if (state[action.payload.resource].pagnation)
    state[action.payload.resource].search = action.payload.value;
};
