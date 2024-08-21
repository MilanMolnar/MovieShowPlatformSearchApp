import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation files
import enTranslation from "./locales/en/translation.json";
import huTranslation from "./locales/hu/translation.json";
import jaTranslation from "./locales/ja/translation.json";
import esTranslation from "./locales/es/translation.json";
import geTranslation from "./locales/ge/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    hu: {
      translation: huTranslation,
    },
    ja: {
      translation: jaTranslation,
    },
    es: {
      translation: esTranslation,
    },
    ge: {
      translation: geTranslation,
    },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

export default i18n;
