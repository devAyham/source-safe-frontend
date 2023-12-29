import { CustomEndPoints } from "api/constants/customEndPoints";
import { Button, Modal } from "components";
import { useFolderRequestsApi } from "services/folderRequestsService";
import { Props } from "./Props";
import { useState } from "react";
import { ServiceType } from "api/constants/servicesName";
import { useQueryClient } from "react-query";
import { generateEntityCollectionQueryKey } from "api/helpers/queryKeysFactory";
import { FileServiceName } from "services/filesService";
import { FilesTrashServiceName } from "services/filesTrashService";

function Component({ file_id }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { createEntity: restoreFile } = useFolderRequestsApi({
    customEndPoint: `${ServiceType.File}/${CustomEndPoints.Restor}/${file_id}`,
    options: {
      createConfig: {
        onSuccess() {
          setOpen(false);
          queryClient.invalidateQueries(
            generateEntityCollectionQueryKey({
              entityType: FilesTrashServiceName,
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
    restoreFile.mutate({});
  };

  return (
    <>
      <Modal
        open={open}
        onOk={onOk}
        title={"Are you sure you want to Restore this file?"}
        closable={false}
        onCancel={onCancel}
        cancelButtonProps={{ danger: true }}
        okText={"ٌRestore"}
        cancelText={"Cancel"}
        confirmLoading={restoreFile.isLoading}
        width={310}
      />
      <Button
        block
        style={{ height: 40 }}
        type="text"
        onClick={() => setOpen(true)}
      >
        Restore File
      </Button>
    </>
  );
}

export default Component;
