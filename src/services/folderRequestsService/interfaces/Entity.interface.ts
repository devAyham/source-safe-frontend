import { IFolderEntity } from "services/folderService";
import { MemberType } from "services/folderService/types/member.type";
import { EntityIdInterface } from "../../../interfaces/EntityId.interface";

export default interface IEntity extends EntityIdInterface {
  folder: IFolderEntity & {
    members: MemberType[];
    file_counts: number;
  };
}
