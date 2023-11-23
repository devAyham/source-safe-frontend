import { Form, Popover } from "antd";
import { useForm } from "antd/es/form/Form";
import { memo, useState } from "react";
import { ReactComponent as FilterICon } from "assets/svg/generalSvgs/filter_icon.svg";
import { FilterType } from "../../interfaces/FilterInterface.d";
import styles from "./styles.module.scss";
import { changeDateToString } from "features/common/helpers/changeDateToString";
import { changeStringToDate } from "features/common/helpers/changeStringToDate";
import { useTranslation } from "react-i18next";
import { Button } from "components";
/** */
export interface FilterProps {
  /**
   * redux state from a slice
   */
  filters: FilterType | null | undefined;
  /**
   * dispacher function
   */
  setFilters: any;
  /**
   * the form items
   */
  children: React.ReactNode;
  /**
   * to disable the popover if it true
   */
  selectionMode?: boolean;
}

/**
 * @description a Popover component that used to add filters params to existing api by wrrap
 *  a form items inside it so that
 * when we click submit we set the filter state which passed form params so that the
 * query api refetched with the filters that we set
 * @param {filtersTypes} param0
 * @returns
 */
const Filter = ({
  filters,
  setFilters,
  children,
  selectionMode,
}: FilterProps) => {
  const [open, setOpen] = useState(false);
  const [form] = useForm();

  const reset = () => {
    form.resetFields();
    setFilters(null);
    setOpen(false);
  };

  const { t } = useTranslation();

  const handleOpenChange = (newOpen: boolean) => {
    let tempFilters = { ...filters };
    if (tempFilters?.registered_between) {
      tempFilters.registered_between = [
        changeStringToDate(tempFilters?.registered_between[0]),
        changeStringToDate(tempFilters?.registered_between[1]),
      ];
    }
    if (tempFilters?.applied_between) {
      tempFilters.applied_between = [
        changeStringToDate(tempFilters?.applied_between[0]),
        changeStringToDate(tempFilters?.applied_between[1]),
      ];
    }
    if (tempFilters?.created_at) {
      tempFilters.created_at = [
        changeStringToDate(tempFilters?.created_at[0]),
        changeStringToDate(tempFilters?.created_at[1]),
      ];
    }
    form.setFieldsValue(tempFilters);
    setOpen(newOpen);
  };
  const onFinish = (values: any) => {
    let filter: FilterType = values;
    if (values.registered_between) {
      filter.registered_between = [
        changeDateToString(values.registered_between[0]),
        changeDateToString(values.registered_between[1]),
      ];
    }
    if (values.applied_between) {
      filter.applied_between = [
        changeDateToString(values.applied_between[0]),
        changeDateToString(values.applied_between[1]),
      ];
    }
    if (values.created_at) {
      filter.created_at = [
        changeDateToString(values.created_at[0]),
        changeDateToString(values.created_at[1]),
      ];
    }
    setFilters(filter);
    setOpen(false);
  };
  let FilterContent = () => {
    return (
      <>
        <Form className={styles.form} form={form} onFinish={onFinish}>
          {children}
          <div className={styles.footer}>
            <Button type="text" htmlType="submit" onClick={reset} danger>
              {t("RESET")}
            </Button>
            <Button type="text" htmlType="submit">
              {t("SEARCH")}
            </Button>
          </div>
        </Form>
      </>
    );
  };
  return (
    <>
      {!selectionMode ? (
        <>
          <Popover
            title={t("FILTERS_BY")}
            content={<FilterContent />}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement="bottomRight"
          >
            <FilterICon
              className={`${styles.filter_icon} ${
                (open || filters) && styles.active
              } `}
            />
          </Popover>
        </>
      ) : (
        <>
          <FilterICon className={`${styles.filter_icon} ${styles.disabled}`} />
        </>
      )}
    </>
  );
};

export default memo(Filter);
