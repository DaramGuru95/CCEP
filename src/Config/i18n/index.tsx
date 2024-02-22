import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import english from "./english.json";
import hindi from "./hindi.json";

const resources = {
  en: {
    translation: english,
  },
  hi: {
    translation: hindi,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
});

export default i18next;
