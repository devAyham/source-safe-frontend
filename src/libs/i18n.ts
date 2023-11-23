import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "locales/en.json";
import translationAR from "locales/ar.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};
/**
 * the implementation for the i18n lib into the app
 */
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
