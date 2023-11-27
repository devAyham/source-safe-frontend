import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * @description a middleware to prevent a user from navigate to apps pages if already enter in an app
 */
export const UnAuthenticatedRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);
  const to = "/";
  const location = useLocation();
  return user == (null || undefined) ? (
    <Outlet />
  ) : (
    <Navigate to={to} state={{ from: location }} />
  );
};
