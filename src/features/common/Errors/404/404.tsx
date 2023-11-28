import { useTranslation } from "react-i18next";
import styles from "../styles.module.scss";
import { ReactComponent as SVG404 } from "assets/svgs/404_svg.svg";
/**
 * @description a component that used to show an ui error intereface for 404 errors
 */
const FourOFourPage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.errorPage}>
      <div className={styles.container}>
        <SVG404 className={styles.image} />
        <div className={styles.text}>
          {t("LOOKS_LIKE_THE_PAGE_YOU_ARE_LOOKING_FOR_DOES_NOT_EXIST")}
        </div>
      </div>
    </div>
  );
};

export default FourOFourPage;
