import { dateFormatter } from "helpers/dateFormatter";
import { Props } from "./Props";
import { DetailsRow } from "./components";
import styles from "./styels.module.scss";
import variables from "styles/variables/_main_colors_vars.module.scss";
import { Tag } from "antd";
import { FileStatusTag } from "components/molecules";

function Component({
  extention,
  last_modified,
  created_at,
  lastAction,
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
        {lastAction && (
          <DetailsRow
            title={"Last Action"}
            value={
              <>
                <span>At {dateFormatter(lastAction.created_at)}</span>
                <br />
                By : <strong>{lastAction.user.name}</strong>
                <br />
                Action Type : <FileStatusTag status={lastAction.status} />
              </>
            }
            color={variables.primary_color_one}
          />
        )}
      </div>
    </>
  );
}

export default Component;
