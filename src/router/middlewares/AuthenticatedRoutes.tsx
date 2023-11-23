import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * @description a middleware for check if the user have app token
 */
export const AuthenticatedRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/formLogin" state={{ from: location }} replace />
  );
};
