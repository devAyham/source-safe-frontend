import { EntityIdInterface } from "../../../interfaces/EntityId.interface";
import { MemberType } from "../types/member.type";

export default interface IEntity extends EntityIdInterface {
  logo: any;
  name: string;
  created_at: string;
  members: MemberType[];
  files_count: number;
  folder_size: number;
}
