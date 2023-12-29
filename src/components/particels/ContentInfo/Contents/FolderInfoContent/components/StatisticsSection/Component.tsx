import { CustomEndPoints } from "api/constants/customEndPoints";
import { StorageDetails } from "components/molecules/StorageDetails";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { convertFileSize } from "helpers/convertFileSize";
import { transformExtentionToFileType } from "helpers/transfromExtentionToFileType";
import { IFileTypeStatistics } from "interfaces/FileTypeStatistics.inteface";
import { FolderServiceName, useFolderApi } from "services/folderService";

function Component() {
  const {
    contentInfo: { activeFolderId },
  } = useAppSelector((state) => state.sharedData);
  const {
    getDetailsEntity: { data },
  } = useFolderApi<{}, StatisticsResponseType[]>({
    customEndPoint: {
      getEndpoint: `.`,
    },
    options: {
      getDetailsConfig: {
        enabled: !!activeFolderId,
        id: `${FolderServiceName}/${CustomEndPoints.Statistic}?folder_id=${activeFolderId}`,
      },
    },
  });
  const DataWithMappers: IFileTypeStatistics[] =
    data?.data.map((row) => {
      const fileType = transformExtentionToFileType(row.extension_group);
      return {
        filesCount: Number(row.count),
        size: row.total_size,
        fileType,
      };
    }) ?? [];

  return (
    <>
      <StorageDetails data={DataWithMappers} />
    </>
  );
}

export default Component;
