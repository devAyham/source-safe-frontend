import {
  faClapperboard,
  faFileCircleQuestion,
  faFileLines,
  faImage,
  faMusic
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import variables from "styles/variables/_main_colors_vars.module.scss";
import { FileTypesType } from "types/FilesTypes.type";

export const fileCategory: {
  [key in FileTypesType]: {
    icon: ReactNode;
    color: string;
    text: string;
  };
} = {
  video: {
    text: "Videos",
    icon: <FontAwesomeIcon icon={faClapperboard} />,
    color: variables.primary_color_one,
  },
  image: {
    icon: <FontAwesomeIcon icon={faImage} />,
    color: variables.success_dark,
    text: "Images",
  },
  audio: {
    icon: <FontAwesomeIcon icon={faMusic} />,
    color: variables.info_color,
    text: "Audios",
  },
  document: {
    icon: <FontAwesomeIcon icon={faFileLines} />,
    color: variables.warninig_dark,
    text: "Documents",
  },
  other: {
    icon: <FontAwesomeIcon icon={faFileCircleQuestion} />,
    color: variables.secondary_color_one,
    text: "Others",
  },
};
