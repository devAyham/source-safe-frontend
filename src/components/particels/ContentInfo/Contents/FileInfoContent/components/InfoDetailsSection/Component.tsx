import { dateFormatter } from "helpers/dateFormatter";
import { Props } from "./Props";
import { DetailsRow } from "./components";
import styles from "./styels.module.scss";
import variables from "styles/variables/_main_colors_vars.module.scss";

function Component({
  extention,
  last_modified,
  lastest_path,
  created_at,
  creator,
  modifier,
  check_in,
}: Props) {
  return (
    <>
      <div className={styles.container}>
        <DetailsRow
          title={"Created at"}
          value={dateFormatter(created_at)}
          color={variables.info_color}
        />
        <DetailsRow
          title={"Full Extention"}
          value={extention}
          color={variables.secondary_color_one}
        />
        <DetailsRow
          title={"Last Modified"}
          value={dateFormatter(last_modified)}
          color={variables.warninig_dark}
        />
        {check_in && (
          <DetailsRow
            title={"Checked-in at"}
            value={check_in}
            color={variables.primary_color_one}
          />
        )}
      </div>
    </>
  );
}

export default Component;
