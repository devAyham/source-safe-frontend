import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Props } from "./Props";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Component({ onClick }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className={styles.logoutItem}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className={styles.icon}
        size="xl"
        shake={isHovered}
      />
    </div>
  );
}

export default Component;
