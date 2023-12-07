import React from "react";
import { Props } from "./Props";
import styles from "./styles.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "components/atoms";

function Component({ routeKey, icon, text }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const paths = location.pathname.split("/");

  return (
    <Button
      clickable={paths[2] !== routeKey}
      type={paths[2] === routeKey ? "text" : "link"}
      className={`${styles.subMenuItem} `}
      onClick={() => {
        navigate(`${paths[1]}/${routeKey}`); //  Mainfeautre/SubFeature
      }}
      icon={icon}
    >
      {text}
    </Button>
  );
}

export default Component;
