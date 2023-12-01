import { Button } from "components/atoms";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileSignature,
  faFolderOpen,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { SubMenuItem } from "components/molecules/SubMenuItem";
import { SubFeaturesRoutes } from "router/constants/subFeaturesRoutes";
function Component() {
  return (
    <div className={styles.dashContentContainer}>
      <Button
        block
        type="primary"
        icon={<FontAwesomeIcon icon={faPlusCircle} className={styles.icon} />}
      >
        Create New
      </Button>
      <SubMenuItem
        icon={<FontAwesomeIcon icon={faFolderOpen} className={styles.icon} />}
        routeKey={SubFeaturesRoutes.MyFolders}
        text="My folders"
      />
      <SubMenuItem
        icon={
          <FontAwesomeIcon icon={faFileSignature} className={styles.icon} />
        }
        routeKey={SubFeaturesRoutes.RecentActivities}
        text="Recent activities"
      />
      <SubMenuItem
        icon={<FontAwesomeIcon icon={faStar} className={styles.icon} />}
        routeKey={SubFeaturesRoutes.Starred}
        text="Starred"
      />
    </div>
  );
}

export default Component;
