import {useTranslation} from "react-i18next";
import styles from "../styles.module.scss";
import {ReactComponent as SVG500} from "assets/svg/generalSvgs/500_svg.svg";
import {Space} from "antd";
import {useNavigate} from "react-router";
import {Button} from "components";

/**
 * @description a component that used to show an ui error intereface for 500 errors or any runtime error
 */
const FiveOO = ({ error, resetErrorBoundary }: any) => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.errorPage}>
      <div className={styles.container}>
        <SVG500 className={styles.image} />
        <div className={styles.text}>
          {t("UNFORTUNATELY_SOMETHING_HAS_GONE_WRONG")}
        </div>
        <Space.Compact className={styles.actions}>
          <Button shape="round" onClick={() => window.location.reload()}>
            {t("RELOAD")}
          </Button>
          {/* <div>If there is no response </div> */}
          <Button
            type="primary"
            shape="round"
            onClick={() => {
              navigate("/");
              window.location.reload();
              // resetErrorBoundary();
            }}
          >
            {t("GO_HOME")}
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
};

export default FiveOO;
