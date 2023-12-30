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
import dashboardSvg from "assets/svgs/dashboard.svg";
import folderRequestsSvg from "assets/svgs/folderRequests.svg";
import sharedWithMeSvgs from "assets/svgs/sharedWithMe.svg";
import trashSvg from "assets/svgs/trash.svg";
function Component({ selectedKey }: Props) {
  const content: {
    [key in MainFeaturesRoutes]: {
      content: ReactNode;
      icon: string;
    };
  } = {
    auth: { content: <></>, icon: "" },
    dashboard: { content: <DashboardContent />, icon: dashboardSvg },
    "folder-requests": {
      content: <FolderRequestsContent />,
      icon: folderRequestsSvg,
    },
    "shared-with-me": {
      content: <SharedWithMeContent />,
      icon: sharedWithMeSvgs,
    },
    trash: { content: <TrashContent />, icon: trashSvg },
  };
  return (
    <div className={styles.siderBarInfo}>
      <div className={styles.logo_container}>
        <Image src={logo} className={styles.logo} />
      </div>
      {selectedKey ? (
        <>
          <div className={styles.contentContainer}>
            {content[selectedKey].content}
          </div>
          <div className={styles.svgContainer}>
            <Image src={content[selectedKey].icon} />
          </div>
        </>
      ) : (
        "noContent"
      )}
    </div>
  );
}

export default Component;
