import { CustomEndPoints } from "api/constants/customEndPoints";
import { Button, Modal } from "components";
import { useFolderRequestsApi } from "services/folderRequestsService";
import { Props } from "./Props";
import { useState } from "react";
import { ServiceType } from "api/constants/servicesName";
import { useQueryClient } from "react-query";
import { generateEntityCollectionQueryKey } from "api/helpers/queryKeysFactory";
import { FileServiceName } from "services/filesService";

function Component({ file_id, disabled }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { createEntity: acceptRequest } = useFolderRequestsApi({
    customEndPoint: `${ServiceType.File}/${file_id}/${CustomEndPoints.CheckIn}`,
  });
  const onCancel = () => {
    setOpen(false);
  };
  const onOk = () => {
    acceptRequest.mutateAsync({}).then(() => {
      setOpen(false);
      queryClient.invalidateQueries(
        generateEntityCollectionQueryKey({
          entityType: FileServiceName,
          params: {},
        })
      );
    });
  };

  return (
    <>
      <Modal
        open={open}
        onOk={onOk}
        title={"Are you sure you want to Check-out this file ?"}
        closable={false}
        onCancel={onCancel}
        cancelButtonProps={{ danger: true }}
        okText={"Check-out"}
        cancelText={"Cancel"}
        confirmLoading={acceptRequest.isLoading}
        width={310}
      />
      <Button
        block
        style={{ height: 40 }}
        type="text"
        onClick={() => setOpen(true)}
        disabled={disabled}
      >
        Check-out
      </Button>
    </>
  );
}

export default Component;
