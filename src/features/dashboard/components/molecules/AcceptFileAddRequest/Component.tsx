import { CustomEndPoints } from "api/constants/customEndPoints";
import { Button, Modal } from "components";
import { useFolderRequestsApi } from "services/folderRequestsService";
import { Props } from "./Props";
import { useState } from "react";
import { ServiceType } from "api/constants/servicesName";
function Component({ request_id: file_id }: Props) {
  const { createEntity: acceptRequest } = useFolderRequestsApi({
    customEndPoint: `${ServiceType.File}/${file_id}/${CustomEndPoints.RequestHandle}`,
    options: {
      createConfig: {
        onSuccess() {},
      },
    },
  });
  const onOk = () => {
    acceptRequest.mutate({
      accept: true,
    });
  };

  return (
    <>
      <Button
        loading={acceptRequest.isLoading}
        size="small"
        type="primary"
        onClick={onOk}
      >
        Accept
      </Button>
    </>
  );
}

export default Component;
