import { MenuItemType } from "features/common/types/MenuItemType.d";
import { rolesTypes } from "features/auth/types/roleTypes";
/** */
export interface MenuItemWithRoleInterface {
  /** */
  roles: rolesTypes[];
  /** */
  item: MenuItemType;
}
