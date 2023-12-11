import { IUserEntity } from "services/userService";
import { EntityIdType } from "types/EntityId.type";

export default interface IEntity {
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: IUserEntity;
}
