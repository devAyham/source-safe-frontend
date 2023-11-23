import { UserInterface } from "../interfaces/UserInterface.d";
import { IUserData } from "services/authService/interfaces/Entity.interface";

/**
 * @param data
 * @returns
 */
export const DestructureUserInfo = (data: IUserData) => {
  const { id, name, email } = data;
  let userInfo: UserInterface;
  userInfo = {
    id,
    name,
    email,
  };

  return userInfo;
};
