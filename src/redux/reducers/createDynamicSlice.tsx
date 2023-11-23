import {
  ActionReducerMapBuilder,
  CaseReducers,
  createSlice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from "@reduxjs/toolkit";
import { NoInfer } from "@reduxjs/toolkit/dist/tsHelpers";
import { AuthSliceActions } from "features/auth/redux/slices/authSlice";
import { IInitialStateCrud } from "interfaces/InitialStateCrud.interface";
import { generateActionCreatorsMethods } from "redux/helpers/generateActionCreatorsMethods";

export function createDynamicSlice<
  State extends Partial<IInitialStateCrud>,
  CR extends SliceCaseReducers<State> = SliceCaseReducers<State>
>({
  name,
  initialState,
  reducers,
  extraReducers,
}: {
  name: string;
  initialState: State;
  reducers?: ValidateSliceCaseReducers<State, CR>;
  extraReducers?: // | CaseReducers<NoInfer<State>, any>
  (builder: ActionReducerMapBuilder<NoInfer<State>>) => void;
}) {
  return createSlice({
    name,
    initialState,
    reducers: {
      Reset: () => ({ ...initialState }),
      ...generateActionCreatorsMethods(initialState),
      ...reducers,
    },
    extraReducers(builder) {
      builder.addCase(AuthSliceActions.Logout, () => ({
        ...initialState,
      }));
      extraReducers?.(builder);
    },
  });
}
