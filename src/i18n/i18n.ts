import 'intl-pluralrules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Language } from 'src/types';

const resources = {
  en: { translation: require('./locales/en/translations.json') },
  uz: { translation: require('./locales/uz/translations.json') },
  de: { translation: require('./locales/de/translations.json') },
  ru: { translation: require('./locales/ru/translations.json') },
  kz: { translation: require('./locales/kz/translations.json') },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Language.English,
  fallbackLng: Language.English,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
