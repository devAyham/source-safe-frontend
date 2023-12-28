import { IFileEntity } from "services/filesService";
import { MemberType } from "services/folderService/types/member.type";

export interface Props {
  extention: string;
  last_modified: string;
  created_at: string;
  lastAction?: IFileEntity["last_action_on_file"];
}
