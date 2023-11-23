import { useAppDispatch } from "features/common/hooks/useReduxHooks";
import { useTranslation } from "react-i18next";
import { IUserData } from "services/authService/interfaces/Entity.interface";
import { DestructureUserInfo } from "../helpers/DestructureUserInfo";
import useNavigateFromState from "./useNavigateFromState";
import useSetUserGlobally from "./useSetUserGlobally";

interface Props {
  user: IUserData;
  token: string;
}
function useOnSuccessLoginHelper() {
  const dispatch = useAppDispatch();
  const { navigateFromState } = useNavigateFromState();
  const { t } = useTranslation();
  const { setUserGlobally } = useSetUserGlobally();

  const onSuccessLoginHelper = ({ token, user }: Props) => {
    const userInfo = DestructureUserInfo(user);
    console.log(userInfo);

      setUserGlobally({
        token,
        userInfo,
      });
      navigateFromState();
  };

  return { onSuccessLoginHelper };
}

export default useOnSuccessLoginHelper;
