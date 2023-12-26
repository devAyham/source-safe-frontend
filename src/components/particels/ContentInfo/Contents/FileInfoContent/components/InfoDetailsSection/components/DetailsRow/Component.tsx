import { Tooltip } from "antd";
import { Props } from "./Props";
import styles from "./styels.module.scss";

function Component({ color, title, value }: Props) {
  return (
    <div className={styles.outerContainer}>
      <div
        className={styles.container}
        style={{
          borderColor: color,
        }}
      >
        <div className={styles.title}>{title} :</div>

        <div className={styles.value}>
          <Tooltip title={value} color={color}>
            {value}
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Component;
