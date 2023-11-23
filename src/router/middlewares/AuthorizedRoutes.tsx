import { rolesTypes } from "features/auth/types/roleTypes";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import FourOThreePage from "features/common/Errors/403/403";
import { Outlet } from "react-router-dom";

interface AuthorizedRoutesProps {
  // roles: any[];
  roles: rolesTypes[];
}
/**
 * @description a middleware for check if the current user have access to the wrapped feature route or not
 * @param {rolesTypes[]} roles - roles that we want to check
 */
export const AuthorizedRoutes = ({ roles }: AuthorizedRoutesProps) => {
  const { user } = useAppSelector((state) => state.auth);
  return roles.includes("user") ? <Outlet /> : <FourOThreePage />;
};
