import { ReactNode } from "react";
import Resumablejs from "resumablejs";
/** */
export default interface IUploaderProps {
  /** */
  maxFiles?: number;
  /** */
  uploaderID?: string;
  /** */
  dropTargetID: string;
  /** */
  filetypes?: any[];
  /** */
  fileAccept?: string;
  /** */
  maxFileSize?: number;
  /** */
  showFileList?: boolean;
  /** */
  hasPrevVideo: boolean;
  /** */
  onUploadErrorCallback?: (
    /** */
    file: Resumable.ResumableFile,
    /** */
    message: string
  ) => void;
  /** */
  onFileRemoved?: (file: Resumable.ResumableFile) => void;
  /** */
  onFileAdded?: (file: Resumable.ResumableFile, resumable: Resumablejs) => void;
  /** */
  onFileSuccess?: (file: Resumable.ResumableFile, fileServer: any) => void;
  /** */
  onCancelUpload?: () => void;
  /** */
  onPauseUpload?: () => void;
  /** */
  onResumeUpload?: () => void;
  /** */
  onStartUpload?: () => void;
  /** */
  onFileAddedError?: (file: File, errorCount: number) => void;
  /** */
  onMaxFileSizeErrorCallback?: (
    /** */
    file: Resumable.ResumableFile,
    /** */
    errorCount: number
  ) => void;
  /** */
  disableDragAndDrop?: boolean;
  /** */
  fileNameServer?: string;
  /** */
  tmpDir?: string;
  /** */
  chunkSize?: number;
  /** */
  simultaneousUploads?: number;
  /** */
  fileParameterName?: string;
  /** */
  generateUniqueIdentifier?: () => string;
  /** */
  maxFilesErrorCallback?: () => void;
  /** */
  maxFilesErrorRetries?: number;
  /** */
  cancelButton?: string | boolean | ReactNode;
  /** */
  pause?: boolean;
  /** */
  startButton?: string | boolean | ReactNode;
  /** */
  pauseButton?: string | boolean | ReactNode;
  /** */
  previousText: string;
  /** */
  headerObject?: object;
  /** */
  withCredentials?: boolean;
  /** */
  forceChunkSize?: boolean;
  /** */
  query?: object;
  /** */
  service?: string;
  /** */
  testMethod?: "GET" | "POST" | "OPTIONS" | "PUT" | "DELETE";
  /** */
  testChunks?: boolean;
  /** */
  disableInput?: boolean;
  /** */
  fileAddedMessage?: string;
  /** */
  completedMessage?: string;
  /** */
  textLabel?: string;
  /** */
  uploadButton?: React.ReactElement;
  /** */
  typeIcon?: React.ReactElement;
}
