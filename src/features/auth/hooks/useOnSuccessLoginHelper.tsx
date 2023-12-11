import { useAppDispatch } from "features/common/hooks/useReduxHooks";
import { useTranslation } from "react-i18next";
import { DestructureUserInfo } from "../helpers/DestructureUserInfo";
import useNavigateFromState from "./useNavigateFromState";
import useSetUserGlobally from "./useSetUserGlobally";
import { AuthStateInterface } from "../interfaces/AuthStateInterface.d";
import { IUserEntity } from "services/userService";

interface Props {
  user: IUserEntity;
  tokens: AuthStateInterface["tokens"];
}
function useOnSuccessLoginHelper() {
  const dispatch = useAppDispatch();
  const { navigateFromState } = useNavigateFromState();
  const { t } = useTranslation();
  const { setUserGlobally } = useSetUserGlobally();

  const onSuccessLoginHelper = ({ tokens, user }: Props) => {
    const userInfo = DestructureUserInfo(user);
    setUserGlobally({
      tokens,
      user,
    });
    navigateFromState();
  };

  return { onSuccessLoginHelper };
}

export default useOnSuccessLoginHelper;
