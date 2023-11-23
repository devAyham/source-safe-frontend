import { message } from "antd";
import Uploader from "./ChunksUploder";
import styles from "./styles.module.scss";
import { ReactComponent as VideoUpload } from "assets/svg/generalSvgs/video_icon.svg";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
// import { useDeleteUploadedVideo } from "features/announcement/apis/useDeleteUploadedVideo";
import { useTranslation } from "react-i18next";
import { useLanguage } from "features/common/hooks/useLanguage";

/** */
interface UploadButtonProps {
  /**
   * unique id
   */
  id: number | null;
  /**
   * for disable the component
   */
  disabled: boolean;
  /**
   * the local path if exist used usually to remove it if we want
   */
  local_path?: string | null;
}
/**
 * @description a component that use the ChunksUploader Component to upload vidoes
 * @param {UploadButtonProps} param0
 *
 */
export default function VideoUploader({
  id,
  disabled,
  local_path,
}: UploadButtonProps) {
  const dispatch = useAppDispatch();
  // const { mutate, isLoading } = useDeleteUploadedVideo();
  const { tokens } = useAppSelector((state) => state.auth);
  // const { VideoRemovedAction, VideoUploadedAction } = videosSliceAction;

  const { t } = useTranslation();

  // const setVideoUploaded = (payload: VideosUploadedInterface) => {
  //   dispatch(VideoUploadedAction(payload));
  // };

  // const setVideoRemoved = (payload: VideosUploadedInterface) => {
  //   dispatch(VideoRemovedAction(payload));
  // };
  const { language } = useLanguage();
  return (
    <Uploader
      maxFilesErrorRetries={3}
      headerObject={{
        Authorization: `Bearer ${tokens.accessToken}`,
        "Accept-Language": language,
        "current-page": window.location.href,
      }}
      uploaderID="Video-uploader"
      dropTargetID="Drag-uploader"
      filetypes={["mp4", "mov", "wmv", "flv", "mpeg-4"]}
      fileAccept="video/*"
      fileAddedMessage="Started!"
      completedMessage="Complete!"
      service={`${process.env.REACT_APP_BASE_API_URL}upload-video`}
      textLabel={`${t("BROWSE")}`}
      previousText={t("DRAG_AND_DROP_VIDEO_FILE")}
      disableDragAndDrop={false}
      disableInput={disabled}
      maxFiles={1}
      startButton={true}
      pauseButton={true}
      cancelButton={true}
      showFileList={true}
      hasPrevVideo={local_path !== null ? true : false}
      onFileSuccess={(file, response) => {
        const res = JSON.parse(response);
        message.success(res.message);
        // setVideoUploaded({ id: id, local_path: res.data.path });
      }}
      onFileRemoved={(file) => {
        if (local_path) {
          //   setVideoRemoved({ id: id, local_path: local_path });
          //   // mutate(local_path);
        }
      }}
      //   onFileAdded={(file, resumable) => {
      //     resumable.upload();
      //   }}
      typeIcon={<VideoUpload className={styles.uploadicon} />}
      // uploadButton={<Button>Upload</Button>}
      onStartUpload={() => {
        ("Start upload");
      }}
      onCancelUpload={() => {
        ("Cancel upload");
      }}
      onPauseUpload={() => {
        ("Pause upload");
      }}
      onResumeUpload={() => {
        ("Resume upload");
      }}
    />
  );
}
