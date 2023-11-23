import { AuthSliceActions } from "features/auth/redux/slices/authSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { useEffect } from "react";

/** */
interface Props {
  /** */
  Ftoken: string | undefined;
  /** */
  setFCM: any;
}
/**
 *
 * @param {Props} param0
 * @returns
 */
const AuthNotification = ({ Ftoken, setFCM }: Props) => {
  const { tokens, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (Ftoken && user === null) {
      dispatch(
        AuthSliceActions.SetTokens({
          accessToken: Ftoken,
        })
      );
    }
    setFCM(undefined);
  }, [Ftoken]);
  return <></>;
};

export default AuthNotification;
