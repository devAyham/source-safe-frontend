import { SideBarMenu } from "components/organisms";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  MainFeaturesRoutes,
  MainFeaturesRoutesArr,
} from "router/constants/mainFeaturesRoutes";
import styles from "./styels.module.scss";
import Logout from "../../../features/auth/components/Modals/Logout";
import { SideBarInfo } from "components/organisms/SideBarInfo";
function Component() {
  const [selectedKey, setSelectedKey] = useState<string>();
  const location = useLocation();

  useEffect(() => {
    const selectedkey = MainFeaturesRoutesArr.reduce(
      (acc, substring) =>
        location.pathname.split("/", 2)[1].toLowerCase() ===
          substring.toLowerCase() && substring.length > acc.length
          ? substring
          : acc,
      ""
    );
    setSelectedKey(selectedkey);
  }, [location]);

  return (
    <div className={styles.siderBar}>
      <div className={styles.siderBarMenuContainer}>
        <SideBarMenu selectedKey={selectedKey as MainFeaturesRoutes} />
        <div className={styles.logoutItemContainer}>
          <Logout />
        </div>
      </div>
      <div className={styles.siderBarInfoContainer}>
        <SideBarInfo selectedKey={selectedKey as MainFeaturesRoutes} />
      </div>
    </div>
  );
}

export default Component;
