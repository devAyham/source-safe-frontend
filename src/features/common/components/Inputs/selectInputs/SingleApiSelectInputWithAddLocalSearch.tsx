import {
  Divider,
  Form,
  FormItemProps,
  Input,
  Select,
  Space,
  Spin,
  message,
} from "antd";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery, UseQueryResult } from "react-query";
import { request } from "../../../../../libs/axios";
import { PlusOutlined } from "@ant-design/icons";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { useTranslation } from "react-i18next";
import { Button } from "components";
/** */
interface SingleApiSelectInputWithAddLocalSearchProps extends FormItemProps {
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
 * @param {SingleApiSelectInputWithAddLocalSearchProps} param0
 * @returns
 */
const SingleApiSelectInputWithAddLocalSearch = ({
  name,
  url,
  urlFilter = "",
  initialValue,
  // for showing the init value in the select input
  labelInValue = false,
  placeholder,
  disabled = false,
  ...props
}: SingleApiSelectInputWithAddLocalSearchProps) => {
  const [data, setData] = useState<any[] | undefined>(undefined);
  const [arName, setArName] = useState("");
  const [enName, setEnName] = useState("");
  const [value, setValue] = useState<string>("");
  const { token } = useAppSelector((state) => state.auth);

  const { t } = useTranslation();

  const onArNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArName(event.target.value);
  };
  const onEnNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnName(event.target.value);
  };

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
    setData(
      items?.data?.data?.data.map((item: any) => {
        return { label: item.name, value: item.id ? item.id : item.name };
      })
    );
  }, [items?.isFetchedAfterMount, items.isRefetching]);

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name[en]", enName);
    formData.append("name[ar]", arName);
    add.mutate(formData);
  };

  useEffect(() => {
    setArName("");
    setEnName("");
  }, [value]);

  const forAdd = () => {
    if (value?.match(/^[\u0621-\u064A0-9 ]+$/g)) {
      setArName(value);
    } else if (value?.match(/^[a-zA-Z0-9 ]+$/g)) {
      setEnName(value);
    } else {
      message.warning(t("CANT_ADD_THIS_ITEM"));
    }
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
          labelInValue={labelInValue}
          loading={items.isRefetching || items.isLoading}
          showSearch
          allowClear
          placeholder={placeholder}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label?.toLowerCase() ?? "").includes(input?.toLowerCase())
          }
          defaultValue={initialValue?.name}
          style={{ width: "100%" }}
          onSearch={setValue}
          notFoundContent={
            data?.length === 0 && !value ? undefined : (
              <div
                style={{ color: "black", textAlign: "center", padding: "10px" }}
              >
                <div style={{ marginBlockEnd: "10px" }}>Item Not Found.</div>
                <Button icon={<PlusOutlined />} onClick={forAdd} />
              </div>
            )
          }
          options={data}
          dropdownRender={(menu) => (
            <>
              {menu}
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

export default SingleApiSelectInputWithAddLocalSearch;
