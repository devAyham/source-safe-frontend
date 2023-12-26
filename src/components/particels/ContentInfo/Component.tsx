import { UserInfoRow } from "components/organisms";
import styles from "./styels.module.scss";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { GeneralStatistics } from "./Contents/GeneralStatistics";
import { FolderInfoContent } from "./Contents/FolderInfoContent";
import { FileInfoContent } from "./Contents/FileInfoContent";

interface DynamicContent {
  [key: string]: JSX.Element;
}

const Component: React.FC = () => {
  const {
    contentInfo: { activeFileId, activeFolderId },
  } = useAppSelector((state) => state.sharedData);

  const dynamicContent: DynamicContent = {
    statistics: <GeneralStatistics />,
    folderInfo: <FolderInfoContent />,
    fileInfo: <FileInfoContent />,
  };

  let selectedContent: JSX.Element;

  if (activeFolderId === null && activeFileId === null) {
    selectedContent = dynamicContent.statistics;
  } else if (activeFolderId !== null && activeFileId === null) {
    selectedContent = dynamicContent.folderInfo;
  } else if (activeFileId !== null) {
    selectedContent = dynamicContent.fileInfo;
  } else {
    selectedContent = <> error UI </>;
  }

  return (
    <div className={styles.contentInfo}>
      <div className={styles.user_info_container}>
        <UserInfoRow />
      </div>
      {selectedContent}
    </div>
  );
};

export default Component;
