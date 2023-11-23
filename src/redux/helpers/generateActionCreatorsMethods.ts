import { flattenArray } from "helpers/falttenArrayMethod";
import { IInitialStateCrud } from "interfaces/InitialStateCrud.interface";
import _ from "lodash";
import { actionCreatorsObject } from "../actions/actionCreatorsObject";
import {
  stateKeysAndActionCreatorKeysMatcher,
  KeyofCrudActionMethods,
} from "../constants/stateKeysAndActionCreatorKeysMatcher";
import { initialStateForBasicCrudKeys } from "../constants/initialStateForBasicCrudKeys";
import { WritableDraft } from "immer/dist/internal";
import { PayloadAction } from "@reduxjs/toolkit";

type returnType = {
  [key in KeyofCrudActionMethods]: (
    state: WritableDraft<Partial<IInitialStateCrud>>,
    action: PayloadAction<any>
  ) => void;
};
export function generateActionCreatorsMethods(
  initialState: Partial<IInitialStateCrud>
): returnType {
  const validInitialStateKeys = Object.keys(initialState) as [
    keyof IInitialStateCrud
  ];
  const NestedArrayOfCrudActionCreatorsKeys = validInitialStateKeys.map(
    (key) => {
      return stateKeysAndActionCreatorKeysMatcher[key];
    }
  );
  const ArrayOfCrudActionCreatorsKeys = flattenArray<
    KeyofCrudActionMethods,
    typeof NestedArrayOfCrudActionCreatorsKeys
  >(NestedArrayOfCrudActionCreatorsKeys);

  const arrayResult = ArrayOfCrudActionCreatorsKeys.map((actionKey) => {
    return {
      [actionKey]: actionCreatorsObject[actionKey],
    };
  });
  const result = _.assignIn<returnType>({}, ...arrayResult);

  return result;
}
