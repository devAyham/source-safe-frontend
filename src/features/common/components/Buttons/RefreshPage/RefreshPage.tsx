import { useQueryClient } from "react-query";
import { ReloadOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { Button } from "components";
/**
 *
 * @description a button that refetch the all active apis in the current page
 */
function RefreshPage() {
  const queryQlient = useQueryClient();
  const refetch = () => {
    queryQlient.refetchQueries({ active: true });
  };
  return (
    <Button
      className={styles.button}
      onClick={refetch}
      type={"ghost"}
      icon={<ReloadOutlined />}
    ></Button>
  );
}

export default RefreshPage;
