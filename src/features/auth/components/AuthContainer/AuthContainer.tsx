import SignPagePicker from "../Pickers/SignPagePicker";
import styles from "./styles.module.scss";
/**
 *
 * @param param0
 * @returns
 */
const AuthContainer = ({ children }: any) => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.children}>
        {children}
        <SignPagePicker />
      </div>
    </div>
  );
};
export default AuthContainer;
