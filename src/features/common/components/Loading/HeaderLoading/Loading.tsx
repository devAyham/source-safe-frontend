import { Spin } from "components";
import styles from "./styles.module.scss";
/** */
interface HeaderLoadingProps {
  /** */
  loading?: boolean;
  /**
   * true ? line : icon
   */
  line?: boolean;
  /**
   * absolute position
   */
  top?: number;
}

/**
 * @description a custom loader that usually used while an api is refetching
 * and it is have two shapes line and icon loader
 * @param {HeaderLoadingProps} param0
 *
 */
const HeaderLoading = ({ loading, line, top = 0 }: HeaderLoadingProps) => {
  return (
    <div className={styles.container}>
      {loading ? (
        line ? (
          <div className={styles.line}></div>
        ) : (
          <div style={{ top: top }} className={styles.loader}>
            <Spin />
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default HeaderLoading;
