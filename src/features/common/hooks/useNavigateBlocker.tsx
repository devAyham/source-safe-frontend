import * as React from "react";
import { UNSAFE_NavigationContext } from "react-router-dom";
import type { History, Blocker, Transition } from "history";
/**
 * @description a hook used to prevent the user from navigater to another page if an action is currently running
 * and works with the help of useCallbackPrompt & useConfirmLeaving hooks
 * @param {Blocker} blocker 
 * @param {boolean} when 
 */
export function useNavigateBlocker(blocker: Blocker, when = true): void {
  const navigator = React.useContext(UNSAFE_NavigationContext)
    .navigator as History;

  React.useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: Transition) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}
