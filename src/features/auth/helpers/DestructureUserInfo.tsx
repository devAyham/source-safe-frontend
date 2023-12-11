import { IUserEntity } from "services/userService";
import { UserInterface } from "../interfaces/UserInterface.d";

/**
 * @param data
 * @returns
 */
export const DestructureUserInfo = (data: IUserEntity) => {
  const { id, name, email } = data;
  let userInfo: UserInterface;
  userInfo = {
    id,
    name,
    email,
  };

  return userInfo;
};
