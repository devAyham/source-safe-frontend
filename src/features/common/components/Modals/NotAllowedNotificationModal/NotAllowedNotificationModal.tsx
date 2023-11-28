import { Modal } from "antd";
import modalStyles from "styles/shared/modalStyles.module.scss";
import { ReactComponent as QRNotificationIcon } from "assets/svgs/qr_notification_icon.svg";
import variables from "styles/_variables/main_colors_vars.module.scss";
import { useTranslation } from "react-i18next";
import { isSupported } from "firebase/messaging";
import { useState } from "react";
/** */
interface NotAllowedNotificationModalProps {
  /** */
  open?: boolean;
  /** */
  notificationPermisson?: NotificationPermission;
  /** */
  setNotificationPermisson?: any;
}
/**
 *
 * @param {NotAllowedNotificationModalProps} param0
 * @returns
 */
const NotAllowedNotificationModal = ({
  open,
  notificationPermisson,
  setNotificationPermisson,
}: NotAllowedNotificationModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  return (
    <Modal
      title={<QRNotificationIcon className={modalStyles.modalLogo} />}
      width={400}
      centered
      open={open && isOpen}
      okText={t("OKAY")}
      cancelText={t("DISMISS")}
      className={modalStyles.modal}
      closeIcon
      maskClosable={false}
      okButtonProps={{
        type: "text",
        block: true,
        style: {
          color: variables.primary_color_one,
          display: notificationPermisson === "denied" ? "none" : "block",
        },
      }}
      cancelButtonProps={{ danger: true, block: true, type: "text" }}
      onCancel={() => {
        setIsOpen(false);
      }}
      onOk={() => {
        isSupported().then((support) => {
          if (support) {
            Notification?.requestPermission().then((value) => {
              setNotificationPermisson(value);
            });
          }
        });
      }}
    >
      <div className={modalStyles.desc} style={{ marginBlockStart: 40 }}>
        <h1>{t("SORRY")}!!</h1>
        <h4>{t("YOU_HAVE_TO_ALLOW_NOTIFICATION_IN_ORDER_TO_USE_OUR_APP")}</h4>
      </div>
    </Modal>
  );
};
export default NotAllowedNotificationModal;
