import { notification } from "antd";
import { useEffect, useState } from "react";
import { WifiOutlined } from "@ant-design/icons";

/**
 *
 * @namespace NetworkProvider
 */
/** responsible for offline mode and show notifications when the user is offline
 * @param {ReactNode} children - wrapped components
 */
const NetworkProvider = ({ children }: any) => {
  const [isOffline, setIsOffline] = useState(false);

  const key = "network_status";

  useEffect(() => {
    if (navigator.onLine) {
      setIsOffline(false);
    } else {
      setIsOffline(true);
    }
  }, [navigator.onLine]);

  // second way to handle offline
  window.addEventListener("online", () => {
    setIsOffline(false);
  });
  window.addEventListener("offline", () => {
    setIsOffline(true);
  });

  useEffect(() => {
    if (isOffline) {
      notification.info({
        key,
        message: "You are currently offline.",
        description: "Please check your internet connection and try again.",
        placement: "bottomLeft",
        icon: <WifiOutlined style={{ color: "#f81d22" }} />,
        duration: 0,
      });
    } else {
      notification.destroy(key);
    }
  }, [isOffline]);

  return <>{children}</>;
};
export default NetworkProvider;
