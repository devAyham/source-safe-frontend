import { Button, Modal } from "components";
import { Props } from "./Props";
import { useFolderRequestsApi } from "services/folderRequestsService";
import { CustomEndPoints } from "api/constants/customEndPoints";
import { useState } from "react";

function Component({ request_id: folder_id }: Props) {
  const [open, setOpen] = useState(false);

  const { createEntity: rejectRequest } = useFolderRequestsApi({
    customEndPoint: `${CustomEndPoints.RejectJoinFolder}/${folder_id}`,
  });
  const onCancel = () => {
    setOpen(false);
  };
  const onOk = () => {
    rejectRequest.mutateAsync({}).then(() => {
      setOpen(false);
    });
  };
  return (
    <>
      <Modal
        open={open}
        onOk={onOk}
        title={"Are you sure you want to Rject This folder Join ?"}
        closable={false}
        onCancel={onCancel}
        cancelButtonProps={{ danger: true }}
        okText={"Reject"}
        cancelText={"Cancel"}
        confirmLoading={rejectRequest.isLoading}
        width={310}
      />
      <Button
        size="small"
        danger
        type="secondary"
        onClick={() => setOpen(true)}
      >
        Reject
      </Button>
    </>
  );
}

export default Component;
