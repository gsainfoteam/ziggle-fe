import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import * as en from "./en-US";
import * as ko from "./ko-KR";

const resources = {
  "ko-KR": { ...ko },
  "en-US": { ...en },
} as const;

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "ko-KR",
    fallbackLng: {
      "en-US": ["en-US"],
      default: ["ko-KR"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
