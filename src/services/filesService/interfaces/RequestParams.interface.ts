import { EntityIdType } from "types";
import IEntity from "./Entity.interface";

export default interface IRequestParams extends IEntity {
  folder_id: EntityIdType;
}
