import React, { memo } from "react";
import { Divider } from "antd";
import { useLanguage } from "features/common/hooks/useLanguage";
import styles from "./styles.module.scss";
import { LanguageTypes } from "features/common/types/LanguageTypes.d";
/**
 * 
 * @description a custom langauge picker 
 */
const LanguagePickerButton = () => {
  const { language, setLanguage } = useLanguage();

  const onChange = (lang: LanguageTypes) => {
    setLanguage(lang);
  };
  return (
    <div className={styles.lang_buttons}>
      <span
        className={`${styles.lang_name} ${language === "en" && styles.active} `}
        onClick={() => {
          onChange("en");
          // setLanguage("en");
        }}
      >
        English
      </span>
      <Divider type="vertical" className={styles.divider} />
      <span
        className={`${styles.lang_name} ${language === "ar" && styles.active}`}
        onClick={() => {
          onChange("ar");
          // setLanguage("ar");
        }}
      >
        عربي
      </span>
    </div>
  );
};
export default memo(LanguagePickerButton);
