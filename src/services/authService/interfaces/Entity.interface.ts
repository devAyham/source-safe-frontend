import { EntityIdType } from "types/EntityId.type";

export default interface IEntity {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: IUserData;
}

export interface IUserData {
  id: EntityIdType;
  email: string;
  name: string;
}
