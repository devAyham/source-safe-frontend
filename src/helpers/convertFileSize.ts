import { FileSizesType } from "features/common/types/fileSizes.type";

export function convertFileSize(
  fileSizeInBytes: number,
  unitOption: FileSizesType
): string {
  const units: Record<string, number> = {
    GB: 1024 * 1024 * 1024,
    MB: 1024 * 1024,
    KB: 1024,
  };

  const convertedSize = fileSizeInBytes / units[unitOption];
  let resualt;
  if (convertedSize > 1) {
    resualt = convertedSize.toFixed(1);
  } else {
    resualt = convertedSize.toFixed(4);
  }
  console.log(convertedSize);

  return `${resualt.toString()} ${unitOption}`;
}
