import { CustomEndPoints } from "api/constants/customEndPoints";
import { ServiceType } from "api/constants/servicesName";
import { Button } from "components";
import { useFolderRequestsApi } from "services/folderRequestsService";
import { Props } from "./Props";
import {
  generateEntityCollectionQueryKey,
  generateEntityQueryKey,
} from "api/helpers/queryKeysFactory";
import { FolderServiceName } from "services/folderService";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { useQueryClient } from "react-query";
import { FileServiceName } from "services/filesService";

function Component({ request_id: file_id }: Props) {
  const queryClient = useQueryClient();
  const { activeFolderId } = useAppSelector(
    (state) => state.sharedData.contentInfo
  );
  const { createEntity: acceptRequest } = useFolderRequestsApi({
    customEndPoint: `${ServiceType.File}/${file_id}/${CustomEndPoints.RequestHandle}`,
    options: {
      createConfig: {
        onSuccess() {
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
    acceptRequest.mutate({
      status: true,
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
