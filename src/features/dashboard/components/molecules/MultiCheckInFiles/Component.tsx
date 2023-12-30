import { CustomEndPoints } from "api/constants/customEndPoints";
import { Button, Modal } from "components";
import { useFolderRequestsApi } from "services/folderRequestsService";
import { Props } from "./Props";
import { useState } from "react";
import { ServiceType } from "api/constants/servicesName";
import { useQueryClient } from "react-query";
import { generateEntityCollectionQueryKey } from "api/helpers/queryKeysFactory";
import { FileServiceName } from "services/filesService";
import { EntityIdType } from "types";

function Component({ files_ids, open, setOpen, onSuccess }: Props) {
  const queryClient = useQueryClient();
  const { createEntity: acceptRequest } = useFolderRequestsApi<{
    ids: EntityIdType[];
  }>({
    customEndPoint: `${ServiceType.File}/${CustomEndPoints.MultiCheckIn}`,
    options: {
      createConfig: {
        onSuccess() {
          setOpen(false);
          onSuccess?.();
          queryClient.invalidateQueries(
            generateEntityCollectionQueryKey({
              entityType: FileServiceName,
              params: {},
            })
          );
        },
      },
    },
  });
  const onCancel = () => {
    setOpen(false);
  };
  const onOk = () => {
    acceptRequest.mutate({
      ids: files_ids,
    });
  };

  return (
    <>
      <Modal
        open={open}
        onOk={onOk}
        title={"Are you sure you want to Check-in this files ?"}
        closable={false}
        onCancel={onCancel}
        cancelButtonProps={{ danger: true }}
        okText={"Check-in"}
        cancelText={"Cancel"}
        confirmLoading={acceptRequest.isLoading}
        width={310}
      />
    </>
  );
}

export default Component;
