import { Pagination as AntPagination } from "antd";
import { useTranslation } from "react-i18next";
import { PaginationProps } from "./PaginationProps";

function Pagination({
  rowsName,
  currentPageLength,
  ...restProps
}: PaginationProps) {
  const { t } = useTranslation();
  return (
    <>
      <AntPagination
        size="small"
        showSizeChanger={true}
        pageSizeOptions={[3,6,9,12,15,18,21]}
        showTotal={(total: number) => {
          return (
            <>
              {["Showing", currentPageLength, "of", total, "result"].join(" ")}
            </>
          );
        }}
        {...restProps}
      />
    </>
  );
}

export default Pagination;
