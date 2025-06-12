import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationAR from './locales/ar/translation.json';
import translationEN from './locales/en/translation.json';

const resources = {
    ar: { translation: translationAR },
    en: { translation: translationEN },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'ar', // اللغة الافتراضية
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React يعتني بالـ XSS
        },
    });

export default i18n;
