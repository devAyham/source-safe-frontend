import {notification} from "antd";
import React, {useEffect} from "react";

/** */
interface ShowNotificationProps {
  /** */
  title?: string;
  /** */
  body?: string;
  /** */
  setFCM?: any;
}

/**
 *
 * @param {ShowNotificationProps} param0
 * @returns
 */
function ShowNotification({ title, body, setFCM }: ShowNotificationProps) {
  useEffect(() => {
    notification.open({
      message: title,
      description: body,
      duration: 10,
      onClick: () => {
        ("Notification Clicked!");
      },
    });
    setFCM(undefined);
  }, [title, body]);

  return <></>;
}

export default ShowNotification;
