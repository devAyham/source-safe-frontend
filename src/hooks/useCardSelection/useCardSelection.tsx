import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCardSelectionProps } from "./useCardSelectionProps";

const useCardSelection = ({
  checkAllRows,
  selectedRows,
  setSelectedRows,
  id,
  selectionMode,
}: useCardSelectionProps): {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
} => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(checkAllRows);
    if (checkAllRows) {
      setSelectedRows([...selectedRows, id]);
    } else if (!checkAllRows) {
      setSelectedRows(selectedRows.filter((id: number) => id !== id));
    }
  }, [checkAllRows]);

  useEffect(() => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((id: number) => id !== id));
    }
  }, [checked]);

  useEffect(() => {
    if (!selectionMode) {
      setChecked(false);
    }
  }, [selectionMode]);
  useEffect(() => {
    if (selectedRows.filter((idd: number) => idd === id).length > 0) {
      setChecked(true);
    }
  }, [selectedRows]);

  return { checked, setChecked };
};

export default useCardSelection;
