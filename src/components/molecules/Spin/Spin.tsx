import { Props } from "./Spin.props";
import { Spin as AntSpin } from "antd";
import styles from "./styles.module.scss";

function Spin(props: Props) {
  return <AntSpin className={styles.Sspin} wrapperClassName={styles.Swrapperspin} {...props} />;
}
export default Spin;
