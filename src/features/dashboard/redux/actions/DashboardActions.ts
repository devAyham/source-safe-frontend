import { IDashboardPayloadAction } from "features/dashboard/interfaces/dashboardSilcePayloadAction.interface";
import { IDashboardSliceInitialState } from "features/dashboard/interfaces/dashboardSliceInitialState.interface";
import { WritableDraft } from "immer/dist/internal";

export const pageAction = (
  state: WritableDraft<IDashboardSliceInitialState>,
  action: IDashboardPayloadAction<number>
) => {
  if (state[action.payload.resource]?.pagnation)
    state[action.payload.resource].pagnation.page = action.payload.value;
};
export const perPageAction = (
  state: WritableDraft<IDashboardSliceInitialState>,
  action: IDashboardPayloadAction<number>
) => {
  if (state[action.payload.resource]?.pagnation)
    state[action.payload.resource].pagnation.perPage = action.payload.value;
};
export const searchAction = (
  state: WritableDraft<IDashboardSliceInitialState>,
  action: IDashboardPayloadAction<string>
) => {
  if (state[action.payload.resource]?.pagnation)
    state[action.payload.resource].search = action.payload.value;
};
