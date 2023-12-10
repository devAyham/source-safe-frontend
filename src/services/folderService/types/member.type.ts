import { IUserData } from "services/authService/interfaces/Entity.interface";

export type MemberType= {
    user: IUserData;
    role: "admin" | "user";
  }