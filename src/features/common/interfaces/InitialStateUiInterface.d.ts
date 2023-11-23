import { DisplayTypes } from "../types/DisplayTypes.d";
import { LanguageTypes } from "../types/LanguageTypes.d";
import { ErrorHandlerInterface } from "features/common/interfaces/ErrorHandlerInterface.d";
/** */
export interface InitialStateUiInterface {
  /** */
  theme: "purple" | "green";
  /** */
  language: LanguageTypes;
  /** */
  disaplay: DisplayTypes;
  /** */
  direction: "ltr" | "rtl";
  /** */
  errors: ErrorHandlerInterface | null;
  /** */
  loading: boolean;
  /** */
  FCMtoken: string | null | false;
  /** */
  deferredPrompt: any;
}
