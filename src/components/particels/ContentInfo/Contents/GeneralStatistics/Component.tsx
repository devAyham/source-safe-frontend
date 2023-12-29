import { DoughnutChart } from "components/atoms/Charts/Doughnut";
import { fileCategory } from "data/FileCategory";
import { IFileTypeStatistics } from "interfaces/FileTypeStatistics.inteface";
import variables from "styles/variables/_main_colors_vars.module.scss";
import styles from "./styels.module.scss";
import { StorageDetails } from "components/molecules/StorageDetails";
import { FolderServiceName, useFolderApi } from "services/folderService";
import { CustomEndPoints } from "api/constants/customEndPoints";
import { transformExtentionToFileType } from "helpers/transfromExtentionToFileType";

function Component() {
  const {
    getDetailsEntity: { data, isLoading },
  } = useFolderApi<{}, StatisticsResponseType[]>({
    customEndPoint: {
      getEndpoint: `.`,
    },
    options: {
      getDetailsConfig: {
        enabled: true,
        id: `${FolderServiceName}/${CustomEndPoints.Statistic}`,
      },
    },
  });
  const DataWithMappers: IFileTypeStatistics[] =
    data?.data.map((row) => {
      const fileType = transformExtentionToFileType(row.extension_group);
      return {
        filesCount: Number(row.count),
        size: +row.total_size,
        fileType,
      };
    }) ?? [];

  const colors = DataWithMappers?.map((row) => {
    return fileCategory[row.fileType].color;
  });

  console.log(DataWithMappers);

  return (
    <>
      <div className={styles.chart}>
        {DataWithMappers.length > 0 && (
          <DoughnutChart
            loading={isLoading}
            data={DataWithMappers}
            angleField="size"
            colorField="fileType"
            colors={[...colors, variables.light_gray_color_two]}
          />
        )}
      </div>
      <StorageDetails data={DataWithMappers} />
    </>
  );
}

export default Component;
