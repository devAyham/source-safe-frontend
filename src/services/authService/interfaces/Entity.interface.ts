import { EntityIdType } from "types/EntityId.type";

export default interface IEntity {
  token: string;
  user: IUserData;
}
export interface IUserData {
  id: EntityIdType;
  email: string;
  name: string;
}
