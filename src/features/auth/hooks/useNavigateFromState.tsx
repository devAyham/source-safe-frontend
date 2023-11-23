import { useLocation, useNavigate } from "react-router-dom";

function useNavigateFromState() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as any;
  const from = state?.from?.pathname || "/";
  const navigateFromState = () => {
    navigate(from);
  };
  return { navigateFromState };
}

export default useNavigateFromState;
