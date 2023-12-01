import { useState } from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { Button } from "components";
import { useLogout } from "features/auth/apis/useLogout";
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
        title={"ARE_YOU_SURE_YOU_WANT_TO_LOGOUT"}
        closable={false}
        onCancel={onCancel}
        okButtonProps={{ danger: true }}
        cancelButtonProps={{ danger: true }}
        okText={"LOGOUT"}
        cancelText={"CANCEL"}
        confirmLoading={isLoading}
        width={310}
      />
    </>
  );
};

export default Logout;
