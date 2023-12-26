import { Props } from "./Props";
import { VersionRow } from "./components";
import styles from "./styels.module.scss";

function Component({ versions }: Props) {
  return (
    <div className={styles.container}>
      {versions?.map((version, index) => {
        return <VersionRow latest={index === 0} {...version} />;
      })}
    </div>
  );
}

export default Component;
