import { useEffect, useState } from "react";
/**
 * a hook that used to make the user confirming that  he want to  leave the current page if an action is running right know like uploading
 * uncompleted video
 * used with the help of the useCallbackPrompt and useNavigateBlocker hooks
 */
export const useConfirmLeaving = () => {
  // our application form state, we could use some libraries here, like Formik
  // or react hook form
  //   const [value, setValue] = useState<string>("");

  // A local state where we observe the formState.
  // For our simple app, the three states 'unchaged', 'modified' and 'saving' are
  // sufficient. Modify the logic according to your use-case.
  const [formState, setFormState] = useState<boolean>(true);

  // The effect where we show an exit prompt, but only if the formState is NOT
  // unchanged. When the form is being saved, or is already modified by the user,
  // sudden page exit could be a destructive action. Our goal is to prevent that.
  useEffect(() => {
    // the handler for actually showing the prompt
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    // if the form is NOT unchanged, then set the onbeforeunload
    if (formState) {
      window.addEventListener("beforeunload", handler);
      window.addEventListener("unload", handleEndConcert);
      // clean it up, if the dirty state changes
      return () => {
        window.removeEventListener("beforeunload", handler);
        window.removeEventListener("unload", handleEndConcert);
        handleEndConcert();
      };
    }
    // since this is not dirty, don't do anything
    return () => {
      window.removeEventListener("beforeunload", handler);
      window.removeEventListener("unload", handleEndConcert);
      handleEndConcert();
    };
  }, [formState]);

  const handleEndConcert = async () => {};
  return [formState, setFormState];
};
