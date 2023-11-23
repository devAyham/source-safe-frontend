import { LoadingIndicator, Spin } from "components";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
/** */
interface LoadingProps {
  /** */
  children: React.ReactNode;
}
/**
 *
 * @param {LoadingProps} param0
 * @returns
 */
const CustomSuspense = ({ children }: LoadingProps) => {
  const { t } = useTranslation();
  const { loading, errors } = useAppSelector((state) => state.ui);
  return (
    <>
      {loading ? (
        <>
          <div className={styles.loading_page}>
            <Spin
              spinning
              size={"large"}
              // tip={t(`loading`)}
              indicator={<LoadingIndicator />}
            />
          </div>
        </>
      ) : (
        children
      )}
    </>
  );
};
export default CustomSuspense;
