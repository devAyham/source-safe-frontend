import { Modal } from "antd";
import { ReactComponent as NoConnectionIcon } from "assets/svg/generalSvgs/no_connection_icon.svg";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import modalStyles from "styles/shared/modalStyles.module.scss";
import variables from "styles/_colors.module.scss";
/** */
interface NoFCMTokenModalProps {
  /** */
  open?: boolean;
}
/**
 *
 * @param {NoFCMTokenModalProps} param0
 * @returns
 */
const NoFCMTokenModal = ({ open }: NoFCMTokenModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal
      title={<NoConnectionIcon className={modalStyles.modalLogo} />}
      width={400}
      centered
      open={open && isOpen}
      okText={t("RETRY")}
      cancelText={t("DISMISS")}
      className={modalStyles.modal}
      closeIcon
      maskClosable={false}
      okButtonProps={{
        block: true,
        type: "text",
        // icon: <RetryIcon style={{ marginInlineEnd: "0.5rem" }} />,
        style: {
          color: variables.primary_color_one,
        },
      }}
      cancelButtonProps={{ danger: true, block: true, type: "text" }}
      onOk={() => {
        window.location.reload();
      }}
      onCancel={() => {
        setIsOpen(false);
      }}
    >
      <div className={modalStyles.desc} style={{ marginBlockStart: 40 }}>
        <h1>{t("SORRY")}!!</h1>
        <h4>{t("YOU_MAY_FACE_SOME_TROUBLE_ISSUES_WHTH_YOUR_CONNECTION")}</h4>
      </div>
    </Modal>
  );
};
export default NoFCMTokenModal;
