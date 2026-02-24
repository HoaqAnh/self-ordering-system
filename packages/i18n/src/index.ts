import viCommon from './locales/vi/common.json';
import viCustomer from './locales/vi/customer.json';
import viAdmin from './locales/vi/admin.json';

import enCommon from './locales/en/common.json';
import enCustomer from './locales/en/customer.json';
import enAdmin from './locales/en/admin.json';

export const i18nResources = {
   vi: {
      common: viCommon,
      customer: viCustomer,
      admin: viAdmin,
   },
   en: {
      common: enCommon,
      customer: enCustomer,
      admin: enAdmin,
   },
};

export type I18nNamespaces = 'common' | 'customer' | 'admin';
