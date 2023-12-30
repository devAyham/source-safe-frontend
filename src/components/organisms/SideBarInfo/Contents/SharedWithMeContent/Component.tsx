import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
function Component() {
  return (
    <>
      {/* <FontAwesomeIcon className={styles.icon} icon={faShareNodes} bounce /> */}
      <div className={styles.text}>
        You can see your shared files and folders from here and get updateds on
        them
      </div>
    </>
  );
}

export default Component;
