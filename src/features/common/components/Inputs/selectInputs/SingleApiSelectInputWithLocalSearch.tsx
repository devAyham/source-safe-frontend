import { Form, FormItemProps, Select } from "antd";
import { AxiosResponse } from "axios";
import { Spin } from "components";
import { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { request } from "../../../../../libs/axios";
/** */
interface SingleApiSelectInputWithLocalSearchProps extends FormItemProps {
  /** */
  name: string;
  /** */
  url: string;
  /** */
  urlFilter?: string;
  /** */
  initialValue?: { name: string; id: string | number };
  /** */
  labelInValue?: boolean;
  /** */
  placeholder?: string;
  /** */
  disabled?: boolean;
}
/**
 *
 * @param {SingleApiSelectInputWithLocalSearchProps} param0
 * @returns
 */
const SingleApiSelectInputWithLocalSearch = ({
  name,
  url,
  urlFilter = "",
  initialValue,
  // for showing the init value in the select input
  labelInValue = false,
  placeholder,
  disabled = false,
  ...props
}: SingleApiSelectInputWithLocalSearchProps) => {
  const [data, setData] = useState<any[] | undefined>(undefined);
  const items: UseQueryResult<AxiosResponse, Error> = useQuery(
    [`get${name}`, urlFilter],
    () => {
      return request({
        url: url + urlFilter,
        method: "GET",
        params: {
          items_per_page: 10000,
        },
      });
    }
  );

  useEffect(() => {
    setData(
      items?.data?.data?.data.map((item: any) => {
        return { label: item.name, value: item.id ? item.id : item.name };
      })
    );
  }, [items?.data?.data]);

  return (
    <>
      <Form.Item
        initialValue={
          initialValue
            ? {
                value: initialValue?.id,
                label: initialValue?.name
                  ? initialValue?.name
                  : initialValue?.id,
              }
            : undefined
        }
        name={name}
        {...props}
      >
        <Select
          labelInValue={labelInValue}
          loading={items.isRefetching || items.isLoading}
          showSearch
          allowClear
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={initialValue?.name}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label?.toLowerCase() ?? "").includes(input?.toLowerCase())
          }
          style={{ width: "100%" }}
          notFoundContent={
            items.isFetching ? (
              <Spin
                style={{ display: "flex", justifyContent: "center" }}
                size="small"
              />
            ) : null
          }
          options={data}
        />
      </Form.Item>
    </>
  );
};

export default SingleApiSelectInputWithLocalSearch;
