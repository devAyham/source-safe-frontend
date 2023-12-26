import { GenericOmit } from "types/GenericOmit.type";
import IEntity from "./Entity.interface";

export default interface ICreate
  extends GenericOmit<
    IEntity,
    "id" | "members" | "files_count" | "folder_size" | "created_at"
  > {}
