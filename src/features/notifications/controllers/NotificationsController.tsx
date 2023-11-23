import React, { useState, useEffect } from "react";
import { onMessageListener } from "../../../config/firebase";
import AuthNotification from "../components/AuthNotification/AuthNotification";
import ShowNotification from "../components/ShowNotification/ShowNotification";
import { FCMInterface } from "../interfaces/FCMInterface.d";
/**
 *
 * @param props
 * @returns
 */
const NotificationsController = (props: any) => {
  // const [show, setShow] = useState(false);
  const [FCM, setFCM] = useState<FCMInterface>();

  onMessageListener()
    .then((payload: any) => {
      if (payload) {
        setFCM(payload);
        // setShow(true);
        // setNotification({
        //   data: {
        //     type: payload.data.type,
        //   },
        //   notification: {
        //     title: payload.notification.title,
        //     body: payload.notification.body,
        //   },
        // });
      }
      // setShow(false)
    })
    .catch((err) => console.error("failed: ", err));

  return (
    <>
      {FCM?.data?.type === "notification" ? (
        <ShowNotification
          title={FCM?.notification.title}
          body={FCM?.notification.body}
          setFCM={setFCM}
        />
      ) : FCM?.data?.type === "authentication" ? (
        <AuthNotification Ftoken={FCM.data.token}  setFCM={setFCM}/>
      ) : (
        <></>
      )}
      {props.children}
    </>
  );
};

export default NotificationsController;
