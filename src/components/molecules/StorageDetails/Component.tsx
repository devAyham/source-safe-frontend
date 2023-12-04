import { Props } from "./Props";
import { RowDetails } from "./RowDetails";
import styles from "./styles.module.scss";

function Component({ data }: Props) {
  return (
    <div className={styles.container}>
      {data?.map(({ fileType, filesCount, size }) => {
        return (
          <RowDetails fileType={fileType} filesCount={filesCount} size={size} />
        );
      })}
    </div>
  );
}

export default Component;
