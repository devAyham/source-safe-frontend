import { Button } from "components";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
/**
 * @description check if the PWA installed or not
 */
const isInstalled = (): boolean => {
  // For iOS
  if ("standalone" in window.navigator && (window.navigator as any).standalone)
    return true;
  // For Android
  if (window.matchMedia("(display-mode: standalone)").matches) return true;
  // If neither is true, it's not installed
  return false;
};
/**
 *
 * @description a component for install the pwa app and it is hidden or not diplay if the app is already installed
 */
const InstallPWA = () => {
  const [installed, setIsInstalled] = useState(false);
  const { deferredPrompt } = useAppSelector((state) => state.ui);

  const { t } = useTranslation();

  useEffect(() => {
    setIsInstalled(isInstalled);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // const deferredPrompt2 = JSON.parse(deferredPrompt);
      // console.log(deferredPrompt);

      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        // message.info("User prompt");
        if (choiceResult.outcome === "accepted") {
          // message.info("User accepted the install prompt");
        } else {
          // message.info("User dismissed the install prompt");
        }
      });
    }
  };

  return installed ? null : (
    <Button block type="primary" onClick={handleInstallClick}>
      {t("INSTALL_PWA")}
    </Button>
  );
};

export default InstallPWA;
