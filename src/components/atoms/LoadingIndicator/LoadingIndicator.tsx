import Lottie from "lottie-web";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import { useAppSelector } from "features/common/hooks/useReduxHooks";

interface AnimationData {
  [key: string]: any;
}
/**
 *
 * @description a loader component with loitte integration loader config
 */
const LoadingIndicator = () => {
  const container = useRef(null);
  const { theme } = useAppSelector((state) => state.ui);
  const [currentFrame, setCurrentFrame] = useState(0);
  useEffect(() => {
    let animationData: AnimationData = {
      key: "loading",
    };

    if (container.current) {
      const newAnimation = Lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: false,
        animationData,
      });
      newAnimation.goToAndPlay(currentFrame, true);
      const onEnterFrame = () => {
        setCurrentFrame(newAnimation.currentFrame);
      };
      newAnimation.addEventListener("enterFrame", onEnterFrame);
      return () => {
        newAnimation.removeEventListener("enterFrame", onEnterFrame);
        newAnimation.destroy();
      };
    }
  }, [theme]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.loader} ref={container}></div>
      </div>
    </>
  );
};

export default LoadingIndicator;
