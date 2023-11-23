import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "components";
import { memo } from "react";
import { useTranslation } from "react-i18next";
/** */
interface DeleteRowsButtonProps {
  /** */
  selectedRows: any;
  /** */
  setdeletedRows: any;
}
/**
 *
 * @param {DeleteRowsButtonProps} param0
 * @returns
 */
const DeleteRowsButton = ({
  selectedRows,
  setdeletedRows,
}: DeleteRowsButtonProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Button
        disabled={selectedRows.length === 0}
        type="primary"
        danger
        icon={<DeleteOutlined />}
        style={{ width: "100%" }}
        onClick={() => {
          setdeletedRows(true);
        }}
      >
        {t("DELETE_ROWS")}
      </Button>
    </>
  );
};

export default memo(DeleteRowsButton);
