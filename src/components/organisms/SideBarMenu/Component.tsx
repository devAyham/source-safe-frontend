import {
  faFolderPlus,
  faShareNodes,
  faSliders,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuItem } from "components/molecules";
import { MainFeaturesRoutes } from "router/constants/mainFeaturesRoutes";
import { Props } from "./Props";
import styles from "./styles.module.scss";

function Component({ selectedKey }: Props) {
  return (
    <div className={styles.siderBarMenu}>
      <MenuItem
        routeKey={MainFeaturesRoutes.DashboardRoute}
        active={selectedKey === MainFeaturesRoutes.DashboardRoute}
        icon={
          <FontAwesomeIcon
            icon={faSliders}
            size="xl"
            bounce={selectedKey === MainFeaturesRoutes.DashboardRoute}
            className={styles.icon}
          />
        }
      />
      <MenuItem
        routeKey={MainFeaturesRoutes.FoldersRequests}
        active={selectedKey === MainFeaturesRoutes.FoldersRequests}
        icon={
          <FontAwesomeIcon
            icon={faFolderPlus}
            size="xl"
            bounce={selectedKey === MainFeaturesRoutes.FoldersRequests}
            className={styles.icon}
          />
        }
      />
      <MenuItem
        routeKey={MainFeaturesRoutes.SharedWithMe}
        active={selectedKey === MainFeaturesRoutes.SharedWithMe}
        icon={
          <FontAwesomeIcon
            icon={faShareNodes}
            size="xl"
            bounce={selectedKey === MainFeaturesRoutes.SharedWithMe}
            className={styles.icon}
          />
        }
      />
      <MenuItem
        routeKey={MainFeaturesRoutes.TrashRoute}
        active={selectedKey === MainFeaturesRoutes.TrashRoute}
        icon={
          <FontAwesomeIcon
            icon={faTrashCan}
            size="xl"
            bounce={selectedKey === MainFeaturesRoutes.TrashRoute}
            className={styles.icon}
          />
        }
      />
    </div>
  );
}

export default Component;
