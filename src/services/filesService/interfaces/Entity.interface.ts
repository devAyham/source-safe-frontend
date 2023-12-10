import { EntityIdType } from "types";
import { EntityIdInterface } from "../../../interfaces/EntityId.interface";
import { IUserData } from "services/authService/interfaces/Entity.interface";

export enum FileStatusEnum {
  CHECKED_IN = "check_in",
  CHECKED_OUT = "check_out",
}
export default interface IEntity extends EntityIdInterface {
  name: string;
  extension: string;
  status: FileStatusEnum;
  latest_path: string;
  last_modified: string;
  created_at: string;
  check_in: any[];
  check_out: any[];
  file_versions: {
    id: EntityIdType;
    path: string;
    name: string;
    extension: string;
    size: number;
    user: IUserData;
  }[];
}
