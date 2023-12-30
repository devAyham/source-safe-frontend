import { EntityIdType } from "types";
import { EntityIdInterface } from "../../../interfaces/EntityId.interface";
import { IUserEntity } from "services/userService";
import { IFolderEntity } from "services/folderService";

export enum FileStatusEnum {
  CHECKED_IN = "check_in",
  CHECKED_OUT = "check_out",
  PROCESSING = "processing",
}

export type FileVersionType = {
  id: EntityIdType;
  path: string;
  name: string;
  extension: string;
  size: number;
  user: IUserEntity;
  created_at : string
};
export default interface IEntity extends EntityIdInterface {
  name: string;
  extension: string;
  status: FileStatusEnum;
  latest_path: string;
  last_modified: string;
  created_at: string;
  check_in: any[];
  check_out: any[];
  file_versions: FileVersionType[];
  latest_size: number;
  full_size: number;
  folder: IFolderEntity;
  last_action_on_file: {
    id: number;
    text: string;
    status: FileStatusEnum;
    user_id: number;
    file_id: number;
    file_version_id: number;
    created_at: string;
    user: IUserEntity;
  };
}
