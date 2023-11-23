import { Empty } from "antd";
import { CompoundedComponent } from "antd/es/float-button/interface";
import { EmptyProps } from "antd/lib/empty";
import noDataIcon from "assets/svg/generalSvgs/no_data_icon.svg";
import styles from "./styles.module.scss";
/** */
interface CustomEmptyProps extends EmptyProps {
  /** */
  hidden: boolean;
}
/**
 *
 * @param {CustomEmptyProps} param0
 * @returns
 */
const CustomEmpty = ({ hidden, ...props }: CustomEmptyProps) => {
  return (
    <>
      {/* //TODO - add icon */}
      <Empty
        image={noDataIcon}
        className={`${styles.empty}  ${hidden ? styles.hidden : ""}`}
        {...props}
      />
    </>
  );
};

export default CustomEmpty;
