import { CustomEndPoints } from "api/constants/customEndPoints";
import { ServiceType } from "api/constants/servicesName";
import { Button } from "components";
import { useFolderRequestsApi } from "services/folderRequestsService";
import { Props } from "./Props";
import { useQueryClient } from "react-query";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import {
  generateEntityCollectionQueryKey,
  generateEntityQueryKey,
} from "api/helpers/queryKeysFactory";
import { FolderServiceName } from "services/folderService";
import { FileServiceName } from "services/filesService";

function Component({ request_id: file_id }: Props) {
  const queryClient = useQueryClient();
  const { activeFolderId } = useAppSelector(
    (state) => state.sharedData.contentInfo
  );
  const { createEntity: rejectRequest } = useFolderRequestsApi({
    customEndPoint: `${ServiceType.File}/${file_id}/${CustomEndPoints.RequestHandle}`,
    options: {
      createConfig: {
        onSuccess() {
          console.log("success");
          queryClient.invalidateQueries(
            generateEntityCollectionQueryKey({
              entityType: FileServiceName,
              params: {},
            }),
            { exact: false }
          );
        },
      },
    },
  });
  const onOk = () => {
    rejectRequest.mutate({
      status: false,
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
