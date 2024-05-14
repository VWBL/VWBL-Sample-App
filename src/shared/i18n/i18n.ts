import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { ja, en } from './resources';


i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      ja,
      en,
    },
    fallbackLng: 'ja',
    lng: 'ja',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie'],
    },
  });

export default i18n;
