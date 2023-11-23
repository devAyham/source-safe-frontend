import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { memo } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "components";
/** */
interface CardsSelectProps {
  /** */
  checkAllRows: boolean;
  /** */
  setcheckAllRows: any;
  /** */
  setselectionMode: any;
  /** */
  selectionMode: boolean;
}
/**
 * 
 * @param {CardsSelectProps} param0 
 * @returns 
 */
const CardsSelect = ({
  checkAllRows,
  setcheckAllRows,
  selectionMode,
  setselectionMode,
}: CardsSelectProps) => {
  const onCheckAllRows = (e: CheckboxChangeEvent) => {
    setcheckAllRows(e.target.checked);
    setselectionMode(e.target.checked);
  };
  const { t } = useTranslation();
  return (
    <>
      <Checkbox checked={checkAllRows} onChange={onCheckAllRows} />
      <Button
        type="link"
        onClick={() => {
          setselectionMode(!selectionMode);
          setcheckAllRows(false);
        }}
      >
        <span className={`${styles.select} ${selectionMode && styles.active}`}>
          {t("SELECT_ALL")}
        </span>
      </Button>
    </>
  );
};

export default memo(CardsSelect);
