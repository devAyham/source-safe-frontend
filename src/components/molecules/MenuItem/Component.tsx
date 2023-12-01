import React from "react";
import { Props } from "./Props";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

function Component({ active, routeKey, icon }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.menuItem} ${active && styles.active}`}
      onClick={() => {
        navigate(routeKey);
      }}
    >
      {icon}
    </div>
  );
}

export default Component;
