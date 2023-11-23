import { Divider, Popover, Radio, Row, Space } from "antd";
import { memo, useState } from "react";
import { ReactComponent as SorterIcon } from "assets/svg/generalSvgs/sort_icon.svg";
import { SorterInterface } from "../../interfaces/SorterInterface.d";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { Button } from "components";
/** */
export interface SorterProps {
  /**
   * the sorter state from redux slice usually
   */
  sorter: SorterInterface;
  /**
   * the array of names that we want to sort on
   */
  sortersName: string[] | { label: string; value: string }[];
  /**
   * the dispatcher fuction
   */
  setSorter: (payload: SorterInterface) => void;
  /**
   * the prop to disable if true
   */
  selectionMode?: boolean;
}
/**
 * @description a component that resposible for making sort request on existing url by passing to its params
 * the sorter state and the names that we want to sort on it and the dispatcher function (setSorter) that will edit the
 * url state on submit  finally a selection mode prop to disable the filter if true
 * @param {sorterTypes} param0
 * @returns
 */
const Sorter = ({
  sorter,
  sortersName,
  setSorter,
  selectionMode,
}: SorterProps) => {
  const [sorterState, setsorterState] = useState<"" | "-">(sorter.type);
  const [sorterTempName, setsorterTempName] = useState<string | null>(
    sorter.name
  );
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    setsorterTempName(sorter.name);
    setsorterState(sorter.type);
  };
  let SorterContent = () => {
    return (
      <>
        <Row>
          <Radio.Group
            className={styles.radiogroup}
            value={sorterTempName}
            onChange={(e) => {
              setsorterTempName(e.target.value);
            }}
          >
            <Space direction="vertical">
              {sortersName.map((name) => {
                return name instanceof Object ? (
                  <Radio value={name.value}>{name.label}</Radio>
                ) : (
                  <Radio value={name}>{name.toUpperCase()}</Radio>
                );
              })}
            </Space>
          </Radio.Group>
          <Divider type="vertical" className={styles.divider} />
          <Space direction="vertical" className={styles.space}>
            <Button
              className={`${styles.sortertype} ${
                sorterState === "" && styles.typeactive
              }`}
              type="ghost"
              size="small"
              onClick={() => {
                setsorterState("");
              }}
            >
              {t("A_Z")}
            </Button>
            <Button
              className={`${styles.sortertype} ${
                sorterState === "-" && styles.typeactive
              }`}
              type="ghost"
              size="small"
              onClick={() => {
                setsorterState("-");
              }}
            >
              {t("Z_A")}
            </Button>
          </Space>
        </Row>
        <br />
        <Row>
          <Button
            danger
            type={"text"}
            onClick={() => {
              setSorter({ name: null, type: "" });
              setOpen(false);
            }}
          >
            {t("RESET")}
          </Button>
          <Button
            style={{ marginInlineStart: "auto" }}
            type="text"
            onClick={() => {
              setSorter({ type: sorterState, name: sorterTempName });
              setOpen(false);
            }}
          >
            {t("OKAY")}
          </Button>
        </Row>
      </>
    );
  };
  return (
    <>
      {!selectionMode ? (
        <>
          <Popover
            content={<SorterContent />}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement="bottomRight"
          >
            <SorterIcon
              className={`${styles.sortericon} ${
                (open || sorter?.name) && styles.active
              }`}
            />
          </Popover>
        </>
      ) : (
        <>
          <SorterIcon className={`${styles.sortericon} ${styles.disabled}`} />
        </>
      )}
    </>
  );
};

export default memo(Sorter);
