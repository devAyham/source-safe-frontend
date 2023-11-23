import { FCMBodyInterface } from "./FCMBodyInterface.d";
import { FCMDatainterface } from "./FCMDatainterface.d";
/** */
export interface FCMInterface {
  /** */
  data: FCMDatainterface;
  /** */
  notification: FCMBodyInterface;
}
