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
import logo from "assets/images/logo.png";
import { Image } from "components/atoms";
import { ReactNode } from "react";
import { DashboardContent } from "./Contents/DashboardContent";
import { FolderRequestsContent } from "./Contents/FolderRequestsContent";
import { SharedWithMeContent } from "./Contents/SharedWithMeContent";
import { TrashContent } from "./Contents/TrashContent";

function Component({ selectedKey }: Props) {
  const content: {
    [key in MainFeaturesRoutes]: ReactNode;
  } = {
    auth: <></>,
    dashboard: <DashboardContent />,
    "folder-requests": <FolderRequestsContent />,
    "shared-with-me": <SharedWithMeContent />,
    trash: <TrashContent />,
  };
  return (
    <div className={styles.siderBarInfo}>
      <div className={styles.logo_container}>
        <Image src={logo} className={styles.logo} />
      </div>
      {selectedKey ? (
        <div className={styles.contentContainer}>{content[selectedKey]}</div>
      ) : (
        "noContent"
      )}
    </div>
  );
}

export default Component;
