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
import Atropos from "atropos/react";

function Component() {
  return (
    <div className={styles.container}>
      <Atropos
        // shadow={false}
        className="my-atropos"
        innerClassName={styles.overlay}
      >
        <div className={styles.imageContainer} data-atropos-offset="10">
          <img src={img} className={styles.image} />
        </div>
        <div className={styles.title} data-atropos-offset="3">
          Sorry this app is only support the xl screens
        </div>
        <div className={styles.icons} data-atropos-offset="-5">
          <FontAwesomeIcon
            style={{
              animationDelay: "0.3s",
            }}
            className={styles.icon}
            icon={faSliders}
            bounce
          />
          <FontAwesomeIcon
            data-atropos-offset="5"
            style={{
              animationDelay: "0.2s",
            }}
            className={styles.icon}
            icon={faFolderPlus}
            bounce
          />
          <FontAwesomeIcon
            data-atropos-offset="5"
            className={styles.icon}
            icon={faShareNodes}
            bounce
          />
          <FontAwesomeIcon
            data-atropos-offset="5"
            style={{
              animationDelay: "0.3s",
            }}
            className={styles.icon}
            icon={faTrashCan}
            bounce
          />
        </div>
      </Atropos>
    </div>
  );
}

export default Component;
