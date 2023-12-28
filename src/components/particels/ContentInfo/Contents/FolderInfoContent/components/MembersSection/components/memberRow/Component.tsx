import { Avatar, Popconfirm, Tag, Tooltip } from "antd";
import { Props } from "./Props";
import styles from "./styels.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/atoms";
import vars from "styles/variables/_main_colors_vars.module.scss";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { AuthorizedToShow } from "HOCs/AuthorizedToShow";
import { FolderServiceName, useFolderApi } from "services/folderService";
import { CustomEndPoints } from "api/constants/customEndPoints";
import { EntityIdType } from "types";
import { useQueryClient } from "react-query";
import { generateEntityQueryKey } from "api/helpers/queryKeysFactory";

function Component({ role, user, owner_id }: Props) {
  const queryClient = useQueryClient();
  const {
    contentInfo: { activeFolderId },
  } = useAppSelector((state) => state.sharedData);
  const {
    createEntity: { mutate, isLoading },
  } = useFolderApi<{ user_id: EntityIdType }>({
    options: {
      createConfig: {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries(
            generateEntityQueryKey({
              entityType: FolderServiceName,
              entityId: activeFolderId,
            })
          );
        },
      },
    },
    customEndPoint: {
      createEndpoint: `${FolderServiceName}/${activeFolderId}/${CustomEndPoints.RemoveMember}`,
    },
  });
  return (
    <div className={styles.container}>
      <Avatar size={40}>{user.name.charAt(0).toUpperCase()}</Avatar>
      <div className={styles.personalInfo}>
        <Tooltip
          title={
            <>
              <div className={styles.name}>{user.name}</div>
              <div className={styles.email}>{user.email}</div>
            </>
          }
        >
          <div className={styles.name}>{user.name}</div>
          <div className={styles.email}>{user.email}</div>
        </Tooltip>
      </div>
      <Tag
        className={styles.tag}
        color={role === "admin" ? vars.secondary_color_one : vars.warninig_dark}
      >
        {role}
      </Tag>
      <AuthorizedToShow id={owner_id}>
        {role !== "admin" && (
          <Popconfirm
            title={"Delete Member "}
            description={
              "Are You sure you want to delete this member from the folder"
            }
            onConfirm={() =>
              mutate({
                user_id: user.id,
              })
            }
            okButtonProps={{
              loading: isLoading,
            }}
            okType={"danger"}
            okText={"Yes"}
            cancelText={"No"}
          >
            <Button
              className={styles.delete}
              danger
              shape="circle"
              type="text"
              icon={<FontAwesomeIcon icon={faTrash} />}
            />
          </Popconfirm>
        )}
      </AuthorizedToShow>
    </div>
  );
}

export default Component;
