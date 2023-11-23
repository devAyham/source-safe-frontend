import { useEffect } from "react";
import { useAppDispatch } from "./useReduxHooks";
import { UiSliceActions } from "../redux/slices/uiSlices";
/**
 * @description hook to store the pwa insatllition state
 */
const usePWA = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // e.preventDefault();
      // console.log(JSON.stringify(e));
      dispatch(UiSliceActions.SetDeferredPrompt(e));
    });
  }, [dispatch]);
};

export default usePWA;
