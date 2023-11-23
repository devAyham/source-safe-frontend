import { UiSliceActions } from "features/common/redux/slices/uiSlices";
import { LanguageTypes } from "features/common/types/LanguageTypes.d";
import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "./useReduxHooks";
/**
 * @description a hook that get used of the i18n lib to changr the app 
 * language and store the current lang in the ui slice
 * @param {LanguageTypes} language
 * @param {Function} setLanguage
 */
export const useLanguage = (): {
  language: LanguageTypes;
  setLanguage: (locale: LanguageTypes) => Promise<void>;
} => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const localLanguage = localStorage.getItem("lng") as LanguageTypes;

  const handleChangeLanguage = useCallback(
    async (locale: LanguageTypes) => {
      localStorage.setItem("lng", locale);
      dispatch(UiSliceActions.ChangeLanguage(locale));
      await i18n.changeLanguage(locale);
    },
    [i18n]
  );

  useEffect(() => {
    if (localLanguage === "ar" || localLanguage === "en") {
      handleChangeLanguage(localLanguage);
    } else {
      handleChangeLanguage("en");
    }
  }, [handleChangeLanguage]);

  return useMemo(
    () => ({
      language: i18n.language as LanguageTypes,
      setLanguage: handleChangeLanguage,
    }),
    [handleChangeLanguage, i18n.language]
  );
};
