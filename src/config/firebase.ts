import { initializeApp } from "firebase/app";
import {
  getMessaging,
  onMessage,
  getToken,
  Messaging,
} from "firebase/messaging";

const {
  REACT_APP_PUBLIC_VAPID_KEY,
  REACT_APP_APP_ID,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_STORGE_BUCKET,
  REACT_APP_PROJECT_ID,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_API_KEY,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

// let messaging: Messaging;
const messaging = getMessaging(firebaseApp);

const publicKey = REACT_APP_PUBLIC_VAPID_KEY;

export const getFCMToken = async () => {
  return await getToken(messaging, { vapidKey: publicKey })
    .then((currentToken) => currentToken)
    .catch((error) => {
      console.error("An error occurred while retrieving token. ", error);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
