import 'intl-pluralrules';
import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NativeModules, Platform } from 'react-native';
import { Language } from 'src/types';

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (lng: string) => void) => {
    const locale =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    callback(locale || Language.English);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

const resources = {
  en: { translation: require('./locales/en/translations.json') },
  uz: { translation: require('./locales/uz/translations.json') },
  de: { translation: require('./locales/de/translations.json') },
  ru: { translation: require('./locales/ru/translations.json') },
  kz: { translation: require('./locales/kz/translations.json') },
};

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    resources,
    lng: Language.English,
    fallbackLng: Language.English,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
