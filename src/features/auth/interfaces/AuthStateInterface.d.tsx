import { UserInterface } from "./UserInterface.d";
/** */
export interface AuthStateInterface {
  /** */
  token: string | null;
  /** */
  userInfo: UserInterface | null;
  /** */
  rememberMe: boolean;
}
