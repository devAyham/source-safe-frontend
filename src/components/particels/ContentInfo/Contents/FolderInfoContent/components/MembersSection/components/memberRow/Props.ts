import { MemberType } from "services/folderService/types/member.type";
import { EntityIdType } from "types";

export interface Props extends MemberType {
  owner_id: EntityIdType;
}
