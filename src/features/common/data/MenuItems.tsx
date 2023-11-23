import { ReactComponent as UsersICon } from "assets/svg/generalSvgs/users_drawer_icon.svg";
import { Translation } from "react-i18next";
import { PagesRotes } from "router/constants/pagesRoutes";
import { MenuItemWithRoleInterface } from "../interfaces/MenuItemWithRoleInterface.d";
import { MenuItemType } from "../types/MenuItemType.d";

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItemType[]
): MenuItemType {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItemType;
}

export const menuItemsWithRoles: MenuItemWithRoleInterface[] = [
  {
    roles: ["user"],
    item: getItem(
      <Translation>{(t) => t("DASHBOARD")}</Translation>,
      "/Dashboard",
      // <DashIcon className={"navIcon"} />,
      <UsersICon className={"navIcon"} />,
      [
        getItem(
          <Translation>{(t) => t("WORKPLACE_TYPES")}</Translation>,
          PagesRotes.DashboardRoutes.WorkPlacesTypes.index
        ),
      ]
    ),
  },
  {
    roles: ["user"],
    item: getItem(
      <Translation>{(t) => t("USERS")}</Translation>,
      "/users-management",
      <UsersICon className={"navIcon"} />,
      [
        getItem(
          <Translation>{(t) => t("USERS")}</Translation>,
          "/users-management/all-users"
        ),
        getItem(
          <Translation>{(t) => t("DOCTORS")}</Translation>,
          "/users-management/doctors"
        ),
        getItem(
          <Translation>{(t) => t("userS")}</Translation>,
          "/users-management/brand-operators"
        ),
      ]
    ),
  },
];
