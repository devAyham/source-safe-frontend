import styles from "./styles.module.scss";
/** */
interface DisabeldAreaProps {
  /** */
  disabled?: boolean;
  /** */
  children: React.ReactNode;
}
/**
 * @description a component used to disable interactive with its children
 * @param {DisabeldAreaProps} param0
 * @returns {JSX.Element}
 */
const DisabeldArea = ({ children, disabled }: DisabeldAreaProps) => {
  if (disabled)
    return (
      <>
        <div className={styles.disabledArea}></div>
        <div className={styles.disabled}>{children}</div>
      </>
    );
  else return <>{children}</>;
};

export default DisabeldArea;
