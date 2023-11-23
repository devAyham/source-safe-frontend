import { useTranslation } from "react-i18next";
import styles from "../styles.module.scss";
import { ReactComponent as SVG403 } from "assets/svg/generalSvgs/403_svg.svg";
/**
 * @description a component that used to show an ui error intereface for 403 errors
 */
const FourOThreePage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.errorPage}>
      <div className={styles.container}>
        <SVG403 className={styles.image} />
        <div className={styles.text}>{t("SORRY_BUT_YOU_DO_NOT_HAVE_ACCESS_THIS_PAGE")}</div>
      </div>
    </div>
  );
};

export default FourOThreePage;
