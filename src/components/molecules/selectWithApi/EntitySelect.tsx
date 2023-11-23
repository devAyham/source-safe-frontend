import { Select } from "antd";
import useApiCRUD from "../../../api/apiHooks/useApiCrud";
import { EntityOption, EntitySelectProps } from "./EntitySelectProps";
import { useState } from "react";
import { IRequestParams } from "../../../api/interfaces/requestParams";
import { debounce } from "lodash";
import { Spin } from "../Spin";

export default function EntitySelect<T>({
  entityType,
  labelKey,
  valueKey,
  maxLength = 50,
  optionRender,
  params,
  options: customOptions,
  ...restProps
}: EntitySelectProps<T>) {
  const [apiParams, setApiParams] = useState<IRequestParams<T>>({
    ...params,
  });
  const { getAllEntities } = useApiCRUD<{}, {}, {}, {}, {}, T>(entityType, {
    getAllConfig: {
      params: {
        ...apiParams,
      },
      enabled: true,
    },
  });
  const options: EntityOption[] =
    getAllEntities?.data?.data.items.map((entity) => ({
      label: entity[labelKey],
      value: entity[valueKey],
    })) ?? [];

  const handleSearch = debounce((value: string) => {
    setApiParams({
      ...apiParams,
      search: value,
    });
  }, 500);

  return (
    <Select
      showSearch
      loading={getAllEntities.isLoading}
      onSearch={handleSearch}
      notFoundContent={
        getAllEntities.isFetching && (
          <Spin
            style={{ display: "flex", justifyContent: "center" }}
            size="small"
          />
        )
      }
      allowClear={true}
      {...restProps}
      filterOption={false}
      options={
        customOptions?.(getAllEntities.data?.data.items ?? []) ??
        options.map((option, index) => ({
          ...option,
          label: optionRender
            ? optionRender(getAllEntities?.data?.data.items[index] as T)
            : option.label,
        }))
      }
    />
  );
}
