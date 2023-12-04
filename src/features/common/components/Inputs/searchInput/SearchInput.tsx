import { Input, Space } from "antd";
import { SearchProps } from "antd/es/input";
import { Button } from "components";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ReactComponent as SearchSvg } from "assets/svgs/Search.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
/** */
export interface SearchInputProps extends SearchProps {
  /**
   * function to set fire on search
   */
  setSearchTerm: any;
  /**
   * if the search is online
   */
  isLoading?: boolean;
  /**
   * to disabel the input if true
   */
  selectionMode?: boolean;
  /**
   * if have a prev or default value
   */
  defaultValue?: string;
}
/**
 * @description an input seach component that takes params and have a use of onChange and onSearch event logic
 * @param {SearchInputProps} param0
 * @returns
 */
const SearchInput = ({
  selectionMode,
  setSearchTerm,
  isLoading,
  defaultValue,
}: SearchInputProps) => {
  const { t } = useTranslation();
  const [feildValue, setFeildValue] = useState<string>("");
  return (
    <>
      <Input.Search
        bordered={false}
        disabled={selectionMode}
        enterButton={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        size="large"
        placeholder={"Search"}
        loading={isLoading}
        onSearch={(value: string) => {
          setSearchTerm(value);
          setFeildValue(value);
        }}
        onChange={(e) => {
          console.log(e.target.value);

          setSearchTerm(e.target.value);
          setFeildValue(e.target.value);
        }}
        allowClear={true}
        defaultValue={defaultValue}
        className={`${styles.searchStyles} ${
          feildValue !== "" && styles.active
        }`}
      />
    </>
  );
};

export default memo(SearchInput);
