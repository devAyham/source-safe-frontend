import { CustomEndPoints } from "api/constants/customEndPoints";
import { ServiceType } from "api/constants/servicesName";
import { Button } from "components";
import { useFolderRequestsApi } from "services/folderRequestsService";
import { Props } from "./Props";

function Component({ request_id: file_id }: Props) {
  const { createEntity: rejectRequest } = useFolderRequestsApi({
    customEndPoint: `${ServiceType.File}/${file_id}/${CustomEndPoints.RequestHandle}`,
    options: {
      createConfig: {
        onSuccess() {},
      },
    },
  });

  const onOk = () => {
    rejectRequest.mutate({
      accept: true,
    });
  };

  return (
    <>
      <Button
        loading={rejectRequest.isLoading}
        size="small"
        type="primary"
        onClick={onOk}
      >
        Reject
      </Button>
    </>
  );
}

export default Component;
