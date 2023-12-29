import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faFileSignature,
  faFolderOpen,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "components/atoms";
import { SubMenuItem } from "components/molecules/SubMenuItem";
import { useState } from "react";
import { SubFeaturesRoutes } from "router/constants/subFeaturesRoutes";
import styles from "./styles.module.scss";
import { AddFolderModal } from "features/dashboard/components/organismis/AddFolder";
import { useQueryClient } from "react-query";
import { ServiceType } from "api/constants/servicesName";
import { generateEntityCollectionQueryKey } from "api/helpers/queryKeysFactory";
import { FolderServiceName } from "services/folderService";

function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  return (
    <>
      <AddFolderModal
        modalProps={{
          open: isOpen,
          onCancel: () => {
            setIsOpen(false);
          },
        }}
        formProps={{
          onSuccess: () => {
            setIsOpen(false);
            queryClient.invalidateQueries(
              generateEntityCollectionQueryKey({
                entityType: FolderServiceName,
                params: {},
              })
            );
          },
        }}
      />
      <div className={styles.dashContentContainer}>
        <Button
          block
          type="primary"
          icon={<FontAwesomeIcon icon={faPlusCircle} className={styles.icon} />}
          onClick={() => {
            setIsOpen(true);
          }}
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
          routeKey={SubFeaturesRoutes.MyCheckIns}
          text="Checked-in Files"
        />
      </div>
    </>
  );
}

export default Component;
