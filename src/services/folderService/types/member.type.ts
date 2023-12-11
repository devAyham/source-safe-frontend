import { IUserEntity } from "services/userService";

export type MemberType = {
  user: IUserEntity;
  role: "admin" | "user";
};
