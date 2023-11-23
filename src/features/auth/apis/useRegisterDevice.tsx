import { useAppSelector } from "features/common/hooks/useReduxHooks";
import useGetUniqueID from "features/common/hooks/useGetUniqueId";
import { DestructureUserInfo } from "../helpers/DestructureUserInfo";
import useSetUserGlobally from "../hooks/useSetUserGlobally";
import { useAuthApi } from "services/authService";

export const useRegisterDevice = () => {
  const { FCMtoken, language } = useAppSelector((state) => state.ui);
  const uuid = useGetUniqueID();
  const { setUserGlobally } = useSetUserGlobally();
  const { createEntity } = useAuthApi({
    customServiceName: "/device/register",
    options: {
      createConfig: {
        onSuccess(data) {
          if (data.data.user !== null) {
            const {
              data: { user, tokens },
            } = data;

            const userInfo = DestructureUserInfo(user);
            //for first mount
            if (tokens) {
              setUserGlobally({
                tokens,
                user: userInfo,
              });
            }
          }
        },
        withOutFeedBackMessage: true,
      },
    },
  });
  const registerDivce = () => {
    createEntity.mutate({});
  };

  return {
    ...createEntity,
    mutate: registerDivce,
  };
};
