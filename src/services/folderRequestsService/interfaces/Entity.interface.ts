import { IFolderEntity } from "services/folderService";
import { EntityIdInterface } from "../../../interfaces/EntityId.interface";
import { IUserEntity } from "services/userService";

export default interface IEntity extends EntityIdInterface {
  folder: IFolderEntity;
  members: IUserEntity[];
  files_count: number;
}
