import { Modal } from "antd";
import modalStyles from "styles/shared/modalStyles.module.scss";
import { ReactComponent as QRNotificationIcon } from "assets/svgs/qr_notification_icon.svg";
import variables from "styles/_colors.module.scss";
import { useTranslation } from "react-i18next";
import { useState } from "react";
/** */
interface NoSupportedNotificationModalProps {
  /** */
  open?: boolean;
}
/**
 *
 * @param {NoSupportedNotificationModalProps} param0
 * @returns
 */
const NoSupportedNotificationModal = ({
  open,
}: NoSupportedNotificationModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();
  return (
    <Modal
      title={<QRNotificationIcon className={modalStyles.modalLogo} />}
      width={400}
      centered
      open={open && isOpen}
      okText={t("OKAY")}
      className={modalStyles.modal}
      closeIcon
      maskClosable={false}
      okButtonProps={{
        type: "text",
        block: true,
        style: {
          color: variables.primary_color_one,
        },
      }}
      cancelButtonProps={{ style: { display: "none" } }}
      onCancel={() => {
        setIsOpen(false);
      }}
      onOk={() => {
        setIsOpen(false);
      }}
    >
      <div className={modalStyles.desc} style={{ marginBlockStart: 40 }}>
        <h1>{t("WARNING")}!!</h1>
        <h4>{t("NOT_SUPPORTED")}</h4>
      </div>
    </Modal>
  );
};
export default NoSupportedNotificationModal;
