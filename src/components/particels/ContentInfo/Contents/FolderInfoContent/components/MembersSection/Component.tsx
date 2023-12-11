import { Typography, Button } from "components/atoms";
import { Props } from "./Props";
import { MemberRow } from "./components";
import styles from "./styels.module.scss";
import { Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { AddMemberModal } from "features/dashboard/components/organismis/AddMember";
import { useState } from "react";
import { useQueryClient } from "react-query";
import {
  generateEntityCollectionQueryKey,
  generateEntityQueryKey,
} from "api/helpers/queryKeysFactory";
import { FolderServiceName } from "services/folderService";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
function Component({ members }: Props) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    contentInfo: { activeFolderId },
  } = useAppSelector((state) => state.sharedData);

  return (
    <>
      <AddMemberModal
        modalProps={{
          open,
          onCancel: () => {
            setOpen(false);
          },
        }}
        formProps={{
          onSuccess: () => {
            setOpen(false);
            queryClient.invalidateQueries(
              generateEntityQueryKey({
                entityType: FolderServiceName,
                entityId: activeFolderId,
              })
            );
          },
        }}
      />
      <div className={styles.container}>
        <Space className={styles.totalRow}>
          <Button
            shape="round"
            type="primary"
            size="small"
            icon={
              <FontAwesomeIcon icon={faPlusCircle} className={styles.icon} />
            }
            onClick={() => {
              setOpen(true);
            }}
          >
            Add new
          </Button>
          <Typography.SubTitle level={5}>
            {members.length} member
          </Typography.SubTitle>
        </Space>
        <div className={styles.membersContinaer}>
          {members.map((member) => {
            return (
              <>
                <MemberRow {...member} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Component;
