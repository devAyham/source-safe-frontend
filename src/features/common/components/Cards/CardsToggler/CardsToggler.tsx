import { memo } from "react";
import { ReactComponent as CardLogo } from "assets/svg/generalSvgs/card_icon.svg";
import styles from "./styles.module.scss";
/** */
interface CardsTogglerProps {
  /** */
  selectionMode: boolean;
  /** */
  view: string;
  /** */
  setView: any;
}
/**
 *
 * @param {CardsTogglerProps} param0
 * @returns
 */
const CardsToggler = ({ selectionMode, view, setView }: CardsTogglerProps) => {
  return (
    <>
      <CardLogo
        className={`${styles.cardlogo} ${view === "cards" && styles.active} ${
          selectionMode && styles.disabled
        }`}
        onClick={() => {
          if (!selectionMode) {
            if (view === "cards") setView("list");
            else setView("cards");
          }
        }}
      />
    </>
  );
};

export default memo(CardsToggler);
