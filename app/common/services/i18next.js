import i18n from "i18next";
import { LANG_COOKIE_NAME } from "config";

import uk from "../locales/uk.po";

const LanguageDetector = __CLIENT__
  ? require("i18next-browser-languagedetector")
  : require("i18next-express-middleware").LanguageDetector; // eslint-disable-line

const service = i18n;
service.use(
  new LanguageDetector(null, {
    order: ["querystring", "cookie", "navigator", "htmlTag"],
    caches: ["cookie"],
    lookupCookie: LANG_COOKIE_NAME,
    lookupQuerystring: "lang"
  })
);

service.init({
  nsSeparator: false,
  keySeparator: false,
  fallbackLng: "uk",
  whitelist: ["uk"],
  resources: {
    uk: {
      translation: uk
    }
  }
});

export default service;
