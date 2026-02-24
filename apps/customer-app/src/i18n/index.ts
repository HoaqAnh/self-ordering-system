import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nResources } from '@self-ordering/i18n';

i18n.use(initReactI18next).init({
   resources: i18nResources,
   lng: 'vi',
   fallbackLng: 'en',
   defaultNS: 'customer',
   ns: ['common', 'customer'],
   interpolation: {
      escapeValue: false,
   },
});

export default i18n;
