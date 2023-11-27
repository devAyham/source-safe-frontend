import { DisplayTypes } from "../types/DisplayTypes.d";
import { LanguageTypes } from "../types/LanguageTypes.d";
import { ErrorHandlerInterface } from "features/common/interfaces/ErrorHandlerInterface.d";
/** */
export interface InitialStateUiInterface {
  /** */
  theme: "purple" | "green";
  /** */
  disaplay: DisplayTypes;
  /** */
  errors: ErrorHandlerInterface | null;
  /** */
  loading: boolean;
  /** */
  /** */
  deferredPrompt: any;
}
