import { EntityIdType } from "types/EntityId.type";
import { rolesTypes } from "../types/roleTypes";
/** */
export interface UserInterface {
  /** */
  id: EntityIdType;
  /** */
  name: string;
  /** */
  email: string;
  /** */
}
