import { Form, Select } from "antd";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { FormItemProps } from "antd/lib/form/FormItem";
import { useSearchDelay } from "features/common/hooks/useSearchDelay";
import { request } from "libs/axios";
import useInfiniteScroll from "features/common/hooks/useInfiniteScroll";
import { Spin } from "components";
/** */
interface MultiApiSelectInputProps extends FormItemProps {
  //  extends CompoundedComponent
  /** */
  name: string; // NOTE: Change from FilterType to string
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
  /** */
  labelInValue?: boolean;
  // props : {...props}
  /** */
  itemsPerPage?: number;
  /** */
  infiniteScroll?: boolean;
}
/**
 *
 * @param {MultiApiSelectInputProps} param0
 * @returns
 */
const MultiApiSelectInput = ({
  name,
  url,
  urlFilter = "",
  initialValue,
  placeholder,
  maxTagCount = 1,
  labelInValue,
  itemsPerPage = 1000,
  infiniteScroll = false,
  ...props
}: MultiApiSelectInputProps) => {
  const [searchContent, setSearchTerm] = useSearchDelay();
  const items = useInfiniteQuery(
    [`get${name}`, urlFilter, searchContent],
    ({ pageParam = 1 }) => {
      return request({
        url: url + urlFilter,
        method: "GET",
        params: {
          page: pageParam,
          items_per_page: itemsPerPage,
          filter: { search: searchContent },
        },
      });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.data?.meta?.nextPageUrl ? nextPage : undefined;
      },
    }
  );

  const { data, onWheel } = useInfiniteScroll({
    data: items.data,
    fetchNextPage: items.fetchNextPage,
    status: items.status,
  });

  return (
    <>
      <Form.Item
        initialValue={
          initialValue
            ? { label: initialValue?.name, value: initialValue?.id }
            : undefined
        }
        // label={`${label} name`}
        name={name}
        {...props}
      >
        <Select
          filterOption={false}
          showArrow
          // showSearch
          mode="multiple"
          allowClear
          maxTagCount={maxTagCount}
          labelInValue={labelInValue}
          // treeCheckable={true}
          placeholder={placeholder}
          onSearch={(value) => {
            setSearchTerm(value);
          }}
          onSelect={() => {
            setSearchTerm(undefined);
          }}
          // onChange={(value) => {
          //   setSearchTerm(value.target.value);
          // }}
          defaultValue={initialValue?.name}
          loading={items.isRefetching || items.isLoading}
          style={{ minWidth: "160px", paddingLeft: 0 }}
          notFoundContent={
            items.isFetching ? (
              <Spin
                style={{ display: "flex", justifyContent: "center" }}
                size="small"
                // indicator={<Loading />}
              />
            ) : null
          }
          options={data.map((v) => ({ value: v.id, label: v.name }))}
          dropdownRender={
            infiniteScroll
              ? (menu) => (
                  <>
                    <div onWheel={onWheel}>{menu}</div>
                    <div>
                      {items.isFetchingNextPage ? (
                        <Spin
                          style={{ display: "flex", justifyContent: "center" }}
                          size="small"
                        />
                      ) : null}
                    </div>
                  </>
                )
              : undefined
          }
        />
      </Form.Item>
    </>
  );
};

export default MultiApiSelectInput;
