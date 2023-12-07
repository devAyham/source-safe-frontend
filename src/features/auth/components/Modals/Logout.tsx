import { Modal } from "antd";
import { useLogout } from "features/auth/apis/useLogout";
import { useState } from "react";
import { LogoutMenuItem } from "../LogoutMenuItem";
/**
 *
 * @returns
 */
const Logout = () => {
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useLogout();
  const onOk = () => {
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
