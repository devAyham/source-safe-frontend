import variables from "styles/_colors.module.scss";

enum UserStatus {
  Active = "active",
  Blocked = "blocked",
  Pending = "pending",
}
type UserStatusColorMap = {
  [key in UserStatus]: string;
};
const userStatusColors: UserStatusColorMap = {
  pending: variables.warninig_dark,
  blocked: variables.errors_color_one,
  active: variables.active_color,
};
export const getUserStatusTag = (status: UserStatus) => {
  return userStatusColors[status];
};
