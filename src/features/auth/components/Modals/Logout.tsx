import { Modal } from "antd";
import { useLogout } from "features/auth/apis/useLogout";
import { useState } from "react";
import { LogoutMenuItem } from "../LogoutMenuItem";
import { useAppDispatch } from "features/common/hooks/useReduxHooks";
import useHandleUserCredantilesInStorge from "features/auth/hooks/useHandleUserCredantilesInStorge";
import { AuthSliceActions } from "features/auth/redux/slices/authSlice";
/**
 *
 * @returns
 */
const Logout = () => {
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useLogout();
  const dispatch = useAppDispatch();
  const { removeUserCredantilesInStorge } = useHandleUserCredantilesInStorge();
  const onOk = () => {
    removeUserCredantilesInStorge();

    dispatch(AuthSliceActions.Logout());
    mutate({});
  };
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <LogoutMenuItem onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onOk={onOk}
        title={"Are you sure you want to logout"}
        closable={false}
        onCancel={onCancel}
        okButtonProps={{ danger: true }}
        cancelButtonProps={{ danger: true }}
        okText={"Logout"}
        cancelText={"Cancel"}
        confirmLoading={isLoading}
        width={310}
      />
    </>
  );
};

export default Logout;
