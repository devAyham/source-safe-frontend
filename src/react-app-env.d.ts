/// <reference types="react-scripts" />

import {
  CustomEditor,
  CustomElement,
  CustomText,
} from "features/common/types/slate_types.d";

export declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
