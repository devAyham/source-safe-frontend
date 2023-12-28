import {
  ITrashSliceInitialState,
  ITrashSlicePayloadAction,
} from "features/trash/interfaces";
import { WritableDraft } from "immer/dist/internal";

export const pageAction = (
  state: WritableDraft<ITrashSliceInitialState>,
  action: ITrashSlicePayloadAction<number>
) => {
  if (state[action.payload.resource].pagnation)
    state[action.payload.resource].pagnation.page = action.payload.value;
};
export const perPageAction = (
  state: WritableDraft<ITrashSliceInitialState>,
  action: ITrashSlicePayloadAction<number>
) => {
  if (state[action.payload.resource].pagnation)
    state[action.payload.resource].pagnation.perPage = action.payload.value;
};
export const searchAction = (
  state: WritableDraft<ITrashSliceInitialState>,
  action: ITrashSlicePayloadAction<string>
) => {
  if (state[action.payload.resource].pagnation)
    state[action.payload.resource].search = action.payload.value;
};
