import React from "react";
import styles from "./styles.module.scss";
import { Image } from "components/atoms";
import img from "assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderPlus,
  faShareNodes,
  faSliders,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
function Component() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div className={styles.imageContainer}>
          <img src={img} className={styles.image} />
        </div>
        <div className={styles.title}>
          Sorry this app is only support the xl screens
        </div>
        <div className={styles.icons}>
          <FontAwesomeIcon
            style={{
              animationDelay: "0.3s",
            }}
            className={styles.icon}
            icon={faSliders}
            bounce
          />
          <FontAwesomeIcon
            style={{
              animationDelay: "0.2s",
            }}
            className={styles.icon}
            icon={faFolderPlus}
            bounce
          />
          <FontAwesomeIcon className={styles.icon} icon={faShareNodes} bounce />
          <FontAwesomeIcon
            style={{
              animationDelay: "0.3s",
            }}
            className={styles.icon}
            icon={faTrashCan}
            bounce
          />
        </div>
      </div>
    </div>
  );
}

export default Component;
