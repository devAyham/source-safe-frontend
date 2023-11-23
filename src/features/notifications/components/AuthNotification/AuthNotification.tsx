import { AuthSliceActions } from "features/auth/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "features/common/hooks/useReduxHooks";
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
  const { token, userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (Ftoken && userInfo === null) {

      dispatch(AuthSliceActions.SetToken(Ftoken));
    }
    setFCM(undefined);
  }, [Ftoken]);
  return <></>;
};

export default AuthNotification;
