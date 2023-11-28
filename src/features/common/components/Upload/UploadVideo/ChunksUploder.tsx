import { message, Progress, Space } from "antd";
import { useEffect, useState } from "react";
import Resumablejs from "resumablejs";
import IUploaderProps from "../../../interfaces/IUploderProps.d";
import styles from "./styles.module.scss";
import variables from "styles/_variables/main_colors_vars.module.scss";
import { useCallbackPrompt } from "features/common/hooks/useCallbackPrompt";
import LeavingPageModal from "../../Modals/LeavingPageModal/LeavingPageModal";
import { DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Button } from "components";

/** */
interface IFileList {
  /** */
  files: Resumable.ResumableFile[];
}
/** */
interface ILocalState {
  /** */
  fileList: IFileList;
  /** */
  progressBar: number;
  /** */
  errorRetries: number;
  /** */
  messageStatus: string;
  /** */
  isPaused: boolean;
  /** */
  isUploading: boolean;
  /** */
  isFailed: boolean;
  /** */
  isRetry: boolean;
  /** */
  isSuccess: boolean;
  /** */
  resumable?: Resumable.Resumable;
}

const MAX_FILE_SIZE = 16 * 1024 * 1024;
const CHUNK_SIZE = 1024 * 1024;

const defaultProps = {
  maxFiles: undefined,
  uploaderID: "default-resumable-uploader",
  dropTargetID: "drop-target",
  filetypes: [],
  fileAccept: "*",
  maxFileSize: MAX_FILE_SIZE,
  showFileList: true,
  disableDragAndDrop: false,
  fileNameServer: "",
  tmpDir: "",
  chunkSize: CHUNK_SIZE,
  simultaneousUploads: 1,
  disableInput: false,
  fileParameterName: "file",
  cancelButton: false,
  pause: false,
  startButton: false,
  pauseButton: false,
  previousText: "",
  headerObject: {},
  withCredentials: false,
  forceChunkSize: false,
  maxFilesErrorRetries: 3,
  maxFilesErrorCallback: () => {
    return true;
  },
  onUploadErrorCallback: (file: Resumable.ResumableFile, message: string) => {
    return message;
  },
  onFileRemoved: function (file: Resumable.ResumableFile) {
    return file;
  },
  onCancelUpload: function () {
    return true;
  },
  onPauseUpload: function () {
    return true;
  },
  onResumeUpload: function () {
    return true;
  },
  onStartUpload: function () {
    return true;
  },
};
/**
 *
 * @param {IUploaderProps} props
 * @returns
 */
const ChunksUploader = (props: IUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [assingDropFlag, setAssingDropFlag] = useState(false);
  const [dropzoneActive, setDropzoneActive] = useState(false);
  const [disabledInput, setDisabledInput] = useState<any>(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(isUploading);
  const [localState, setLocalState] = useState<ILocalState>({
    progressBar: 0,
    errorRetries: 0,
    messageStatus: "",
    fileList: { files: [] },
    isPaused: false,
    isUploading: false,
    isFailed: false,
    isRetry: false,
    isSuccess: false,
    resumable: undefined,
  });
  const { t } = useTranslation();

  let dropZone: null | HTMLElement = null;
  let uploader: null | HTMLElement = null;

  const mergedProps = {
    ...defaultProps,
    ...props,
  };

  useEffect(() => {
    if (localState.isUploading) {
      setIsUploading(true);
    } else {
      setIsUploading(false);
    }
  }, [localState.isUploading]);

  useEffect(() => {
    const config: Resumable.ConfigurationHash = {
      target: mergedProps.service,
      query: mergedProps.query || {},
      fileType: mergedProps.filetypes,
      maxFiles: mergedProps.maxFiles,
      maxFileSize: mergedProps.maxFileSize as unknown as boolean, // yay for hacks!
      fileTypeErrorCallback: (file: File, errorCount) => {
        if (typeof mergedProps.onFileAddedError === "function") {
          mergedProps.onFileAddedError(file, errorCount);
        } else {
          message.error(`can not upload ${file.type} type`);
        }
      },
      maxFileSizeErrorCallback: (file: Resumable.ResumableFile, errorCount) => {
        if (typeof mergedProps.onMaxFileSizeErrorCallback === "function") {
          mergedProps.onMaxFileSizeErrorCallback(file, errorCount);
        } else {
          message.error(`can not upload more than 100 mb`);
        }
      },
      testMethod: mergedProps.testMethod || "POST",
      testChunks: mergedProps.testChunks || false,
      headers: mergedProps.headerObject || {},
      withCredentials: mergedProps.withCredentials || false,
      chunkSize: mergedProps.chunkSize,
      simultaneousUploads: mergedProps.simultaneousUploads,
      fileParameterName: mergedProps.fileParameterName,
      generateUniqueIdentifier: mergedProps.generateUniqueIdentifier,
      forceChunkSize: mergedProps.forceChunkSize,
      maxChunkRetries: 3,
      chunkRetryInterval: 100,
    };
    const resumable = new Resumablejs(config);

    if (typeof mergedProps.maxFilesErrorCallback === "function") {
      resumable.opts.maxFilesErrorCallback = mergedProps.maxFilesErrorCallback;
    }

    if (uploader && !mergedProps.disableInput)
      resumable.assignBrowse(uploader, false);

    //Enable or Disable DragAnd Drop
    if (mergedProps.disableDragAndDrop === false && !assingDropFlag) {
      setAssingDropFlag(true);
      if (dropZone && !mergedProps.disableInput) resumable.assignDrop(dropZone);
    }

    resumable.on("fileAdded", (file: Resumable.ResumableFile, event: Event) => {
      setDisabledInput(true);
      setLocalState({
        ...localState,
        messageStatus: mergedProps.fileAddedMessage || "Starting upload! ",
        isUploading: resumable.isUploading(),
        isFailed: false,
        resumable,
      });

      if (typeof mergedProps.onFileAdded === "function") {
        mergedProps.onFileAdded(file, resumable);
      } else {
        resumable.upload();
      }
    });

    resumable.on(
      "fileSuccess",
      (file: Resumable.ResumableFile, fileServer: any) => {
        setDisabledInput(true);
        if (mergedProps.fileNameServer) {
          let objectServer = JSON.parse(fileServer);
          file.fileName = objectServer[mergedProps.fileNameServer];
        } else {
          file.fileName = fileServer;
        }

        let currentFiles = localState.fileList.files;
        currentFiles.push(file);

        setLocalState({
          ...localState,
          isFailed: false,
          isSuccess: true,
          fileList: { files: currentFiles },
          messageStatus:
            mergedProps.completedMessage + file.fileName || fileServer,
          resumable,
        });

        if (typeof mergedProps.onFileSuccess === "function") {
          mergedProps.onFileSuccess(file, fileServer);
        }
      }
    );

    resumable.on("progress", () => {
      setDisabledInput(true);
      setLocalState((localState) => {
        return {
          ...localState,
          isUploading: resumable.isUploading(),
          resumable,
        };
      });

      const progress = resumable.progress() * 100;

      if (progress < 100) {
        setLocalState({
          ...localState,
          messageStatus: progress + "%",
          progressBar: progress,
          isFailed: false,
          isUploading: resumable.isUploading(),
          resumable,
        });
      } else {
        setTimeout(() => {
          setLocalState({
            ...localState,
            progressBar: 0,
            isFailed: false,
            resumable,
          });
        }, 100);
      }
    });

    resumable.on(
      "fileError",
      (file: Resumable.ResumableFile, message: string) => {
        setDisabledInput(true);

        if (mergedProps.onUploadErrorCallback) {
          mergedProps.onUploadErrorCallback(file, message);
        }
        if (mergedProps.maxFilesErrorRetries)
          if (localState.errorRetries < mergedProps.maxFilesErrorRetries) {
            setLocalState({
              ...localState,
              errorRetries: localState.errorRetries++,
              isFailed: true,
              resumable,
            });
          } else {
            resumable.cancel();
            setLocalState({
              ...localState,
              isFailed: true,
              errorRetries: 0,
              resumable,
            });
          }
      }
    );
    resumable.on("error", (file: Resumable.ResumableFile, messag: string) => {
      message.error("Faild To Upload File");

      if (mergedProps.onUploadErrorCallback) {
        mergedProps.onUploadErrorCallback(file, messag);
      }
      if (mergedProps.maxFilesErrorRetries)
        if (localState.errorRetries < mergedProps.maxFilesErrorRetries) {
          setLocalState({
            ...localState,
            errorRetries: localState.errorRetries++,
            isFailed: true,
            resumable,
          });
        } else {
          setLocalState({
            ...localState,
            isFailed: true,
            errorRetries: 0,
            resumable,
          });
          resumable.cancel();
        }
    });
    resumable.on(
      "fileRetry",
      (file: Resumable.ResumableFile, message: string) => {
        setDisabledInput(true);
        setLocalState({
          ...localState,
          errorRetries: localState.errorRetries++,
          isRetry: true,
          isUploading: true,
          resumable,
        });
      }
    );
    setLocalState({
      ...localState,
      resumable,
    });
  }, [props]);

  const removeFile = (file: Resumable.ResumableFile, index: number) => {
    let currentFileList = localState.fileList.files.filter((file, i) => {
      return i !== index;
    });

    setLocalState({
      ...localState,
      fileList: { files: currentFileList },
    });

    if (mergedProps.onFileRemoved) {
      mergedProps.onFileRemoved(file);
      localState.resumable!.removeFile(file);
    }
  };

  const createFileList = () => {
    let markup = localState.fileList.files.map(
      (file: Resumable.ResumableFile, index) => {
        let uniqID = mergedProps.uploaderID + "-" + index;
        let originFile = file.file;
        let media = null;

        if (file.file.type.indexOf("video") > -1) {
          media = <label className="video">{originFile.name}</label>;
          return (
            <li className="thumbnail" key={uniqID}>
              <label id={"media_" + uniqID}>{media}</label>
              <Button
                type="link"
                danger
                onClick={() => removeFile(file, index)}
              >
                <DeleteOutlined />
              </Button>
            </li>
          );
        } else if (file.file.type.indexOf("image") > -1)
          if (mergedProps.tmpDir !== "") {
            let src = mergedProps.tmpDir + file.fileName;
            media = <img className="image" width="80" src={src} alt="" />;
            return (
              <li className="thumbnail" key={uniqID}>
                <label id={"media_" + uniqID}>{media}</label>
                <Button
                  type="link"
                  danger
                  onClick={() => removeFile(file, index)}
                >
                  <DeleteOutlined />
                </Button>
              </li>
            );
          } else {
            media = <label className="document">{originFile.name}</label>;
            return (
              <li className="thumbnail" key={uniqID}>
                <label id={"media_" + uniqID}>{media}</label>

                <Button
                  type="link"
                  danger
                  onClick={() => removeFile(file, index)}
                >
                  <DeleteOutlined />
                </Button>
              </li>
            );
          }
      }
    );
    return <ul id={"items-" + mergedProps.uploaderID}>{markup}</ul>;
  };

  const cancelUpload = () => {
    localState.resumable!.cancel();

    setLocalState({
      ...localState,
      isFailed: false,
      isPaused: false,
      isRetry: false,
      isSuccess: false,
      isUploading: false,
      errorRetries: 0,
      fileList: { files: [] },
    });

    if (typeof mergedProps.onCancelUpload === "function")
      mergedProps.onCancelUpload();
  };
  const pauseUpload = () => {
    if (!localState.isPaused) {
      localState.resumable!.pause();
      setLocalState({
        ...localState,
        // isUploading: false,
        isPaused: true,
      });
      if (typeof mergedProps.onPauseUpload === "function")
        mergedProps.onPauseUpload();
    } else {
      localState.resumable!.upload();
      setLocalState({
        ...localState,
        // isUploading: false,
        isPaused: false,
      });
      if (typeof mergedProps.onResumeUpload === "function")
        mergedProps.onResumeUpload();
    }
  };
  const retryManual = () => {
    if (localState.isFailed) {
      localState.resumable!.fire();
      setLocalState({
        ...localState,
        isFailed: false,
        isRetry: true,
        isUploading: true,
        isPaused: false,
        errorRetries: localState.errorRetries++,
      });
    }
  };

  const startUpload = () => {
    localState.resumable!.upload();
    setLocalState({
      ...localState,
      isPaused: false,
    });
    if (typeof mergedProps.onStartUpload === "function")
      mergedProps.onStartUpload();
  };

  const fileList = mergedProps.showFileList ? (
    <div className="resumable-list">{createFileList()}</div>
  ) : null;

  const textLabel = mergedProps.textLabel ? mergedProps.textLabel : null;

  let startButton = null;
  if (mergedProps.startButton) {
    if (
      typeof mergedProps.startButton === "string" ||
      typeof mergedProps.startButton === "boolean"
    ) {
      startButton = (
        <label>
          <Button
            type="primary"
            disabled={
              localState.isUploading &&
              localState.progressBar > 0 &&
              !localState.isPaused
                ? true
                : false
            }
            className={styles.startButton}
            onClick={startUpload}
          >
            {mergedProps.startButton && t("START")}
          </Button>
        </label>
      );
    } else {
      startButton = mergedProps.startButton;
    }
  }

  let cancelButton = null;
  if (mergedProps.cancelButton) {
    if (
      typeof mergedProps.cancelButton === "string" ||
      typeof mergedProps.cancelButton === "boolean"
    ) {
      cancelButton = (
        <label>
          <Button
            danger
            type="primary"
            disabled={!localState.isUploading}
            onClick={cancelUpload}
          >
            {mergedProps.cancelButton && t("CANCEL")}
          </Button>
        </label>
      );
    } else {
      cancelButton = mergedProps.cancelButton;
    }
  }

  let pauseButton = null;
  if (mergedProps.pauseButton) {
    if (
      typeof mergedProps.pauseButton === "string" ||
      typeof mergedProps.pauseButton === "boolean"
    ) {
      pauseButton = (
        <label>
          <Button
            type="dashed"
            disabled={!localState.isUploading || localState.isPaused}
            className="btn pause"
            onClick={pauseUpload}
          >
            {mergedProps.pauseButton && t("PAUSE")}
          </Button>
        </label>
      );
    } else {
      pauseButton = mergedProps.pauseButton;
    }
  }
  let retryButton = (
    <>
      {localState.isFailed ? (
        <Button
          type="primary"
          // disabled={!localState.isUploading || localState.isPaused}
          className="btn pause"
          onClick={retryManual}
          danger
        >
          {t("RETRY")}
        </Button>
      ) : null}
    </>
  );

  return (
    <>
      <LeavingPageModal
        cancelFunction={cancelUpload}
        // @ts-ignore
        showDialog={showPrompt}
        confirmNavigation={confirmNavigation}
        cancelNavigation={cancelNavigation}
      />
      <div
        id={mergedProps.dropTargetID}
        className={`${styles.dropzone} ${
          mergedProps.disableInput && styles.disabled
        }
       ${localState.isUploading ? styles.active : styles.non_active}
       ${localState.isFailed && styles.failed}
       ${localState.isRetry && styles.retry}
       ${localState.isPaused && styles.paused} `}
        ref={(node) => {
          dropZone = node;
        }}
        onDrop={(e) => {
          e.preventDefault();
        }}
      >
        {localState.fileList.files.length > 0 ? (
          fileList
        ) : mergedProps.hasPrevVideo ? (
          <>
            <div>Already Have Prev Data Uploaded</div>
            <Button
              type="link"
              danger
              onClick={() => {
                mergedProps.onFileRemoved(localState?.fileList?.files[0]);
              }}
            >
              <DeleteOutlined />
            </Button>
          </>
        ) : (
          <>
            <Progress
              style={
                localState.isUploading
                  ? { display: "block" }
                  : { display: "none" }
              }
              type="circle"
              status={
                localState.isRetry
                  ? "normal"
                  : localState.isFailed
                  ? "exception"
                  : localState.isSuccess
                  ? "success"
                  : localState.isUploading
                  ? "active"
                  : "normal"
              }
              percent={+localState.progressBar.toFixed(0)}
              strokeColor={
                localState.isRetry
                  ? {
                      "0%": variables.warninig_dark,
                      "100%": variables.warninig_dark,
                    }
                  : localState.isPaused
                  ? {
                      "0%": variables.warninig_dark,
                      "100%": variables.warninig_dark,
                    }
                  : localState.isFailed
                  ? {
                      "0%": variables.errors_color_one,
                      "100%": variables.errors_color_one,
                    }
                  : localState.isSuccess
                  ? {
                      "0%": variables.primary_color_three,
                      "100%": variables.primary_color_three,
                    }
                  : localState.isUploading
                  ? {
                      "0%": variables.primary_color_one,
                      "100%": variables.primary_color_one,
                    }
                  : {}
              }
            />
            <input
              readOnly={mergedProps.disableInput}
              ref={(node) => {
                uploader = node;
              }}
              type="file"
              id={mergedProps.uploaderID}
              className="btn"
              name={mergedProps.uploaderID + "-upload"}
              accept={mergedProps.fileAccept || "*"}
              disabled={mergedProps.disableInput || false}
              style={{ display: "none" }}
              onDragOver={(e) => {
                e.preventDefault();
                setDropzoneActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDropzoneActive(false);
              }}
            />
            <div
              className={`
         ${localState.isUploading ? styles.uploading : styles.notuploading} 
        `}
            >
              {mergedProps.typeIcon}
              <div className={styles.inlineText}>
                {t("DRAG_AND_DROP_VIDEO_FILE")}
              </div>
              <p className={styles.or}>{t("OR")}</p>
              <label
                className={
                  localState.isUploading || localState.isRetry
                    ? styles.uploading
                    : ""
                }
                htmlFor={mergedProps.uploaderID}
              >
                <span className={styles.browse}>{textLabel}</span>
              </label>
            </div>
            {localState.isUploading && (
              <Space style={{ marginTop: 10 }}>
                {startButton}
                {pauseButton}
                {cancelButton}
              </Space>
            )}
            {/* {retryButton} */}
            <div
              className={styles.retries}
              style={
                localState.errorRetries > 0
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              Retries : {localState.errorRetries}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChunksUploader;
