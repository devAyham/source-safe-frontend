import LanguagePickerButtons from "features/common/components/Pickers/Language/LanguagePickerButtons";
import styles from "./styles.module.scss";
import { ReactComponent as PillLogin } from "assets/svg/generalSvgs/pill_login_icon.svg";
/**
 * 
 * @param param0 
 * @returns 
 */
const AuthContainer = ({ children }: any) => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.pill_icon}>
        {/* <PillLogin /> */}
      </div>
      <div className={styles.children}>
        {children}
        <LanguagePickerButtons />
      </div>
    </div>
  );
};
export default AuthContainer;
