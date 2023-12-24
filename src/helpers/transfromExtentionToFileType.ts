import { FileTypesType } from "types/FilesTypes.type";

export function transformExtentionToFileType(extention: string): FileTypesType {
  const ext = extention.split("/", 1)[0];

  const mapper: {
    [key in string]: FileTypesType;
  } = {
    audio: "audio",
    text: "document",
    video: "video",
    image: "image",
  };

  return mapper[ext] ?? "other";
}
