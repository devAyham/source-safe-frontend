// import {useAppDispatch} from "features/common/hooks/useReduxHooks";
// import {useEffect, useState} from "react";
// import decryptData from "features/common/helpers/decryptData";
// import {UiSliceActions} from "features/common/redux/slices/uiSlices";
// import {getFCMToken} from "config/firebase";
// import encryptData from "features/common/helpers/encryptData";
// import NoFCMTokenModal from "features/common/components/Modals/NoFCMTokenModal/NoFCMTokenModal";
// import NotAllowedNotificationModal
//     from "features/common/components/Modals/NotAllowedNotificationModal/NotAllowedNotificationModal";
// import {isSupported} from "firebase/messaging";
// import NoSupportedNotificationModal
//     from "features/common/components/Modals/NoSupportedNotificationModal/NoSupportedNotificationModal";

// interface FirebaseProviderProps {
//   children: any;
// }

// /**
//  * @namespace FirebaseProvider
//  */

// /**
//  *  @description   responsible for integration firebase inside the app and ask user for notification
//  *when there is proxy error a pop up will shown
//  *also if the notifications is not alloweded a pop up will shown
//  *   @param {any} children - wrapped components
//  */
// const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
//   const dispatch = useAppDispatch();
//   // const { t } = useTranslation();
//   const [isNoFCMToken, setIsNoFCMToken] = useState(false);
//   const [isNotificationNotAllowed, setIsNotificationNotAllowed] =
//     useState(false);
//   const [isNotificationNotSupported, setIsNotificationNotSupported] =
//     useState(false);
//   const [notificationPermisson, setNotificationPermisson] =
//     useState<NotificationPermission>();

//   useEffect(() => {
//     if (
//       notificationPermisson === "denied" ||
//       notificationPermisson === "default"
//     )
//       setIsNotificationNotAllowed(true);
//     else setIsNotificationNotAllowed(false);
//   }, [notificationPermisson]);

//   useEffect(() => {
//     isSupported().then((support) => {
//       if (support) {
//         setIsNotificationNotSupported(false);
//         setNotificationPermisson(Notification?.permission);
//       } else {
//         setIsNotificationNotSupported(true);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     let FCMtoken = decryptData(sessionStorage.getItem("FCMtoken") || "");
//     if (FCMtoken) {
//       dispatch(UiSliceActions.SetFCMtoken(FCMtoken));
//       setIsNoFCMToken(false);
//     } else {
//       tokenFunc();
//     }
//     async function tokenFunc() {
//       dispatch(UiSliceActions.SetLoading(true));
//       await getFCMToken()
//         .then((FCMtoken) => {
//           if (FCMtoken) {
//             dispatch(UiSliceActions.SetFCMtoken(FCMtoken));
//             sessionStorage.setItem("FCMtoken", encryptData(FCMtoken));
//             setIsNoFCMToken(false);
//           } else {
//             // dispatch(UiSliceActions.SetError({ message: t("FCMgetProblem") }));
//             setIsNoFCMToken(true);
//             dispatch(UiSliceActions.SetFCMtoken(false));
//           }
//         })
//         .catch(() => {
//           // dispatch(
//           //   UiSliceActions.SetError({ message: t("FCMgetSessionProblem") })
//           // );
//           setIsNoFCMToken(true);
//           dispatch(UiSliceActions.SetFCMtoken(false));
//         });
//       dispatch(UiSliceActions.SetLoading(false));
//     }
//   }, []);

//   return (
//     <>
//       {children}
//       {isNotificationNotSupported ? (
//         <NoSupportedNotificationModal open={isNotificationNotSupported} />
//       ) : isNotificationNotAllowed ? (
//         <NotAllowedNotificationModal
//           open={isNotificationNotAllowed}
//           notificationPermisson={notificationPermisson}
//           setNotificationPermisson={setNotificationPermisson}
//         />
//       ) : (
//         <NoFCMTokenModal open={isNoFCMToken} />
//       )}
//     </>
//   );
// };

// export default FirebaseProvider;
