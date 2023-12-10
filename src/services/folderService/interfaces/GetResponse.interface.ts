import { MemberType } from "../types/member.type";
import IEntity from "./Entity.interface";

export default interface IGetResponse extends IEntity {
  members: MemberType[];
  files: string[];
}
