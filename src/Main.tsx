import { ReactQueryDevtools } from "react-query/devtools";
import Router from "./router/Router";
import CustomSuspence from "features/common/layouts/Suspence/Suspence";
import NotificationsController from "features/notifications/controllers/NotificationsController";
import FirebaseProvider from "providers/FirebaseProvider/FirebaseProvider";
import AuthProvider from "providers/AuthProvider/AuthProvider";
import AntDesignConfigProvider from "providers/AntDesignConfigProvider/AntDesignConfigProvider";
import { useLocation } from "react-router";
import NetworkProvider from "providers/NetworkProvider/NetworkProvider";
import usePWA from "features/common/hooks/usePWA";
import "swiper/css";

/**
 * Main Component Contains all app providers
 */
function Main() {
  const location = useLocation();
  onbeforeunload = (e) => {
    sessionStorage.setItem("location", JSON.stringify(location));
  };
  usePWA();
  return (
    <>
      <AntDesignConfigProvider>
        <NetworkProvider>
          {/* <FirebaseProvider> */}
          <AuthProvider>
            <CustomSuspence>
              <NotificationsController>
                <Router />
              </NotificationsController>
            </CustomSuspence>
          </AuthProvider>
          {/* </FirebaseProvider> */}
        </NetworkProvider>
      </AntDesignConfigProvider>
      <ReactQueryDevtools initialIsOpen={true} position={"bottom-left"} />
    </>
  );
}

export default Main;
