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
        pageSizeOptions={[2, 4, 8, 10, 12, 20]}
        showTotal={(total: number) => {
          return (
            <>
              {[
                t("SHOWING"),
                currentPageLength,
                t("OF"),
                total,
                t("RESULT"),
              ].join(" ")}
            </>
          );
        }}
        {...restProps}
      />
    </>
  );
}

export default Pagination;