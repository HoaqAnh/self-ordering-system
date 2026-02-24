import { Button } from '@self-ordering/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function App() {
   const { i18n, t } = useTranslation();
   const [loading, setLoading] = useState(false);

   const toggleLanguage = () => {
      const newLang = i18n.language === 'vi' ? 'en' : 'vi';
      i18n.changeLanguage(newLang);
   };

   const handleSubmit = () => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
         alert('Thành công!');
      }, 2000);
   };
   return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
         <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>
         <div className="flex my-2 space-x-5">
            <p>{t('common:system.changeLanguage')}</p>
            <Button size="sm" variant="secondary" onClick={toggleLanguage}>
               {t(`common:language.${i18n.language}`)}
            </Button>
         </div>
         <Button size="md" variant="primary" isLoading={loading} onClick={handleSubmit}>
            {loading ? t('common:system.saving') : t('common:buttons.save')}
         </Button>
         <Button size="sm" disabled variant="danger">
            {t('dashboard.total_orders')}
         </Button>
      </div>
   );
}
