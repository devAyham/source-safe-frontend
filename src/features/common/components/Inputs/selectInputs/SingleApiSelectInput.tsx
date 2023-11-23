import { Form, FormItemProps, Select } from "antd";
import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import useInfiniteScroll from "features/common/hooks/useInfiniteScroll";
import { useSearchDelay } from "features/common/hooks/useSearchDelay";
import { request } from "libs/axios";
import { Spin } from "components";
/** */
interface SingleApiSelectInputProps extends FormItemProps {
  //  extends CompoundedComponent
  /** */
  name: string | any[];
  // name: keyof FilterType;
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
  // props : {...props}
  /** */
  disabled?: boolean;
  /** */
  optionalKey?: any;
  /** */
  onSelect?: any;
  /** */
  onChange?: any;
  /** */
  fullItemDetails?: boolean;
  /** */
  itemsPerPage?: number;
  /** */
  infiniteScroll?: boolean;
}

/**
 *
 * @param {SingleApiSelectInputProps} param0
 * @returns
 */
const SingleApiSelectInput = ({
  name,
  url,
  urlFilter = "",
  initialValue,
  // for showing the init value in the select input
  labelInValue = false,
  placeholder,
  disabled = false,
  optionalKey = null,
  onSelect,
  onChange,
  fullItemDetails,
  itemsPerPage = 1000,
  infiniteScroll = false,
  ...props
}: SingleApiSelectInputProps) => {
  const [searchContent, setSearchTerm] = useSearchDelay();
  //NOTE - edit this select to infinite select
  const items = useInfiniteQuery(
    [`get${name}`, searchContent, optionalKey, urlFilter],
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
  useEffect(() => {
    items.refetch();
  }, [searchContent]);

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
          filterOption={false}
          labelInValue={labelInValue}
          loading={items.isRefetching || items.isLoading}
          showSearch
          allowClear
          placeholder={placeholder}
          onSelect={onSelect}
          onSearch={(value) => {
            setSearchTerm(value);
          }}
          onChange={onChange}
          disabled={disabled}
          defaultValue={initialValue?.name}
          style={{ width: "100%" }}
          notFoundContent={
            items.isFetching ? (
              <Spin
                style={{ display: "flex", justifyContent: "center" }}
                size="small"
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

export default SingleApiSelectInput;
