import { Modal } from "antd";
import { Button } from "components";
import { useTranslation } from "react-i18next";
/** */
interface LeavingPageModalProps {
  /** */
  showDialog: boolean;
  /** */
  cancelNavigation: any;
  /** */
  confirmNavigation: any;
  /** */
  cancelFunction: () => void;
}
/**
 *
 * @param {LeavingPageModalProps} param0
 * @returns
 */
const LeavingPageModal: React.FC<LeavingPageModalProps> = ({
  showDialog,
  cancelNavigation,
  confirmNavigation,
  cancelFunction,
}) => {
  const { t } = useTranslation();
  const cancel = () => {
    confirmNavigation();
    cancelFunction();
  };
  return (
    <Modal
      closable={false}
      open={showDialog}
      title={<div>{t("ARE_YOU_SURE_YOU_WANT_TO_LEAVE")}</div>}
      footer={[
        <>
          <Button type="primary" onClick={cancelNavigation}>
            {t("NO")}
          </Button>
          <Button type="primary" danger onClick={cancel}>
            {t("YES")}
          </Button>
        </>,
      ]}
    >
      {t("YOU_WILL_LOST_THE_PROGRESS_YOU_MADE")}
    </Modal>
  );
};
export default LeavingPageModal;
