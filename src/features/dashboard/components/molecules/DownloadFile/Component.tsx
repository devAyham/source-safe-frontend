import { CustomEndPoints } from "api/constants/customEndPoints";
import { Button, Modal } from "components";
import { useFolderRequestsApi } from "services/folderRequestsService";
import { Props } from "./Props";
import { useState } from "react";
function Component({ file_id: folder_id }: Props) {
  const [open, setOpen] = useState(false);
  const { createEntity: acceptRequest } = useFolderRequestsApi({
    customEndPoint: `${CustomEndPoints.AcceptJoinFolder}/${folder_id}`,
  });
  const onCancel = () => {
    setOpen(false);
  };
  const onOk = () => {
    acceptRequest.mutateAsync({}).then(() => {
      setOpen(false);
    });
  };

  return (
    <>
      <Modal
        open={open}
        onOk={onOk}
        title={"Are you sure you want to Join This folder ?"}
        closable={false}
        onCancel={onCancel}
        cancelButtonProps={{ danger: true }}
        okText={"Accept"}
        cancelText={"Cancel"}
        confirmLoading={acceptRequest.isLoading}
        width={310}
      />
      <Button size="small" type="primary" onClick={() => setOpen(true)}>
        Accept
      </Button>
    </>
  );
}

export default Component;
