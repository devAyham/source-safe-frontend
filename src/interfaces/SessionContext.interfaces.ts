import { Dispatch, SetStateAction } from "react";
import { SessionIdType } from "types";

export interface ISessionContext {
  sessionId: SessionIdType;
  setSessionId: Dispatch<SetStateAction<SessionIdType>>;
}
