import { UserInfoRow } from "components/organisms";
import styles from "./styels.module.scss";
import { DoughnutChart } from "components/atoms/Charts/Doughnut";
import variables from "styles/variables/_main_colors_vars.module.scss";
import { StorageDetails } from "components/molecules/StorageDetails";
import { IFileTypeStatistics } from "interfaces/FileTypeStatistics.inteface";
import { fileCategory } from "data/FileCategory";

function Component() {
  const data: IFileTypeStatistics[] = [
    { filesCount: 400, fileType: "video", size: 40 },
    { filesCount: 1300, fileType: "image", size: 50 },
    { filesCount: 660, fileType: "document", size: 77 },
    { filesCount: 100, fileType: "other", size: 10 },
  ];
  const dataWithFreeSpace = [
    ...data,
    { filesCount: 400, fileType: "free", size: 40 },
  ];
  const colors = data?.map((row) => {
    return fileCategory[row.fileType].color;
  });
  return (
    <div className={styles.contentInfo}>
      <div className={styles.user_info_container}>
        <UserInfoRow />
      </div>
      <div className={styles.chart}>
        <DoughnutChart
          loading={false}
          data={dataWithFreeSpace}
          angleField="size"
          colorField="fileType"
          colors={[...colors, variables.light_gray_color_two]}
        />
      </div>
      <StorageDetails data={data} />
    </div>
  );
}

export default Component;
