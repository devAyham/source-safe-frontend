import { StorageDetails } from "components/molecules/StorageDetails";
import { IFileTypeStatistics } from "interfaces/FileTypeStatistics.inteface";

function Component() {
  const data: IFileTypeStatistics[] = [
    { filesCount: 400, fileType: "video", size: 40 },
    { filesCount: 1300, fileType: "image", size: 50 },
    { filesCount: 660, fileType: "document", size: 77 },
    { filesCount: 100, fileType: "other", size: 10 },
  ];
  return (
    <>
      <StorageDetails data={data} />
    </>
  );
}

export default Component;
