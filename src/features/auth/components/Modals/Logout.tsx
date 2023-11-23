import { useState } from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import { Button } from "components";
import { useNewLogout } from "features/auth/apis/useLogout";
/**
 *
 * @returns
 */
const Logout = () => {
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useNewLogout();
  const { t } = useTranslation();

  const onOk = () => {
    mutate({});
  };
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button block danger onClick={() => setOpen(true)}>
        {t("LOGOUT")}
      </Button>
      <Modal
        open={open}
        onOk={onOk}
        title={t("ARE_YOU_SURE_YOU_WANT_TO_LOGOUT")}
        closable={false}
        onCancel={onCancel}
        okButtonProps={{ danger: true }}
        cancelButtonProps={{ danger: true }}
        okText={t("LOGOUT")}
        cancelText={t("CANCEL")}
        confirmLoading={isLoading}
        width={310}
      />
    </>
  );
};

export default Logout;
