import { UserInterface } from "./UserInterface.d";
/** */
export interface AuthStateInterface {
  /** */
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
  /** */
  user: UserInterface | null;
  /** */
  rememberMe: boolean;
}
