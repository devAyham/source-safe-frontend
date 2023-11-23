import {
  Divider,
  Form,
  FormItemProps,
  Input,
  Select,
  Space,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useMutation } from "react-query";

import { PlusOutlined } from "@ant-design/icons";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { useSearchDelay } from "features/common/hooks/useSearchDelay";
import { request } from "libs/axios";
import useInfiniteScroll from "features/common/hooks/useInfiniteScroll";
import { useTranslation } from "react-i18next";
import { Button, Spin } from "components";
/** */
interface SingleApiSelectInputWithAddProps extends FormItemProps {
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
  /** */
  itemsPerPage?: number;
  /** */
  infiniteScroll?: boolean;
}
/**
 *
 * @param {SingleApiSelectInputWithAddProps} param0
 * @returns
 */
const SingleApiSelectInputWithAdd = ({
  name,
  url,
  urlFilter = "",
  initialValue,
  // for showing the init value in the select input
  labelInValue = false,
  placeholder,
  disabled = false,
  itemsPerPage = 10,
  infiniteScroll = false,
  ...props
}: SingleApiSelectInputWithAddProps) => {
  const [searchContent, setSearchTerm] = useSearchDelay();
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const { token } = useAppSelector((state) => state.auth);

  const { t } = useTranslation();

  const onArNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArName(event.target.value);
  };
  const onEnNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnName(event.target.value);
  };

  const items = useInfiniteQuery(
    [`get${name}`, searchContent, urlFilter],
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

  const add = useMutation(
    `add${name}`,
    (data: FormData) => {
      return request({
        url,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      });
    },
    {
      onSuccess: async (response) => {
        message.success(response.data.message);
        setArName("");
        setEnName("");
        items.refetch();
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

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name[en]", enName);
    formData.append("name[ar]", arName);
    add.mutate(formData);
  };

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
          onSearch={(value) => {
            setSearchTerm(value);
          }}
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
          dropdownRender={(menu) => (
            <>
              {infiniteScroll ? (
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
              ) : (
                menu
              )}
              <Divider style={{ margin: "8px 0" }} />
              <Space style={{ padding: "0 8px 4px" }}>
                <Input
                  placeholder={`${t("ENGLISH_NAME")}`}
                  value={enName}
                  onChange={onEnNameChange}
                  required
                />
                <Input
                  placeholder={`${t("ARABIC_NAME")}`}
                  value={arName}
                  onChange={onArNameChange}
                  required
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  disabled={!arName || !enName}
                  loading={add.isLoading}
                  onClick={addItem}
                />
              </Space>
            </>
          )}
          disabled={disabled}
        />
      </Form.Item>
    </>
  );
};

export default SingleApiSelectInputWithAdd;
