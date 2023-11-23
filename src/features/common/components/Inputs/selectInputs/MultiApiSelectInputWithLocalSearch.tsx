import { Form, Select } from "antd";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { request } from "../../../../../libs/axios";
import { FormItemProps } from "antd/lib/form/FormItem";
import { Spin } from "components";
/** */
interface MultiApiSelectInputWithLocalSearchProps extends FormItemProps {
  /** */
  name: string;
  /** */
  url: string;
  /** */
  urlFilter?: string;
  /** */
  initialValue?: any;
  /** */
  placeholder?: string;
  /** */
  maxTagCount?: number;
}
/**
 *
 * @param {MultiApiSelectInputWithLocalSearchProps} param0
 * @returns
 */
const MultiApiSelectInputWithLocalSearch = ({
  name,
  url,
  urlFilter = "",
  initialValue,
  placeholder,
  maxTagCount = 1,
  ...props
}: MultiApiSelectInputWithLocalSearchProps) => {
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
        return { label: item.name, value: item.id };
      })
    );
  }, [items?.data?.data]);

  return (
    <>
      <Form.Item
        initialValue={
          initialValue
            ? { label: initialValue?.name, value: initialValue?.id }
            : undefined
        }
        name={name}
        {...props}
      >
        <Select
          showArrow
          mode="multiple"
          allowClear
          maxTagCount={maxTagCount}
          placeholder={placeholder}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label?.toLowerCase() ?? "").includes(input?.toLowerCase())
          }
          defaultValue={initialValue?.name}
          loading={items.isRefetching || items.isLoading}
          style={{ minWidth: "160px", paddingLeft: 0 }}
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

export default MultiApiSelectInputWithLocalSearch;
