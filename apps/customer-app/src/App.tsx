import { type MenuItem } from '@self-ordering/types';

import { useQuery } from '@tanstack/react-query';
import { Button } from '@self-ordering/ui';
import { useCartStore } from '@/features/cart/hooks/useCartStore';
import { useTranslation } from 'react-i18next';
import { apiClient } from '@/lib/apiClient';
import { ThemeSwitch } from '@self-ordering/ui';
import { Modal } from '@self-ordering/ui';
import { useState } from 'react';

const fetchMenu = async (): Promise<MenuItem[]> => {
   return apiClient.get('/menu');
};

export default function App() {
   const { i18n, t } = useTranslation();
   const [isPayModal, setIsPayModal] = useState(false);
   const [isPaying, setIsPaying] = useState(false);

   const toggleLanguage = () => {
      const newLang = i18n.language === 'vi' ? 'en' : 'vi';
      i18n.changeLanguage(newLang);
   };

   const togglePay = () => {
      setIsPaying(true);
      setTimeout(() => {
         setIsPayModal(false);
         setIsPaying(false);
      }, 1000);
   };

   const { data: menuItems, isLoading, isError } = useQuery({ queryKey: ['menu'], queryFn: fetchMenu });
   const cartItems = useCartStore((state) => state.items);
   const totalPrice = useCartStore((state) => state.totalPrice);
   const addItem = useCartStore((state) => state.addItem);
   const removeItem = useCartStore((state) => state.removeItem);

   if (isLoading) return <div className="p-10 text-center">{t('common:system.loadingMenu')}</div>;
   if (isError) return <div className="p-10 text-center text-error">{t('common:system.dataError')}</div>;

   return (
      <div className="max-w-4xl mx-auto p-6 grid grid-cols-2 gap-8">
         <div>
            <h1 className="text-2xl font-bold mb-4">{t('menu.title')}</h1>
            <div className="flex flex-col gap-4">
               {menuItems?.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg flex justify-between items-center shadow-sm">
                     <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-secondary">{item.price.toLocaleString('vi-VN')} đ</p>
                     </div>
                     <div className="flex gap-1">
                        <Button onClick={() => addItem(item)} variant="primary" size="sm">
                           {t('common:buttons.add')}
                        </Button>
                        <Button onClick={() => removeItem(item.id)} variant="text" size="sm">
                           {t('common:buttons.cancel')}
                        </Button>
                     </div>
                  </div>
               ))}
               <div className="flex justify-between">
                  <h4>{t(`common:system.theme.title`)}</h4>
                  <ThemeSwitch />
               </div>
               <div className="flex justify-between">
                  <p>{t('common:system.changeLanguage')}</p>
                  <Button size="sm" variant="secondary" onClick={toggleLanguage}>
                     {t(`common:language.${i18n.language}`)}
                  </Button>
               </div>
            </div>
         </div>

         <div className="bg-background p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-bold mb-4">
               {t('cart.title')} ({cartItems.length} {t('menu.dish')})
            </h2>

            {cartItems.length === 0 ? (
               <p className="text-secondary">{t('cart.empty')}.</p>
            ) : (
               <div className="flex flex-col gap-3">
                  {cartItems.map((item) => (
                     <div key={item.id} className="flex text-primary justify-between">
                        <span>
                           {item.quantity}x {item.name}
                        </span>
                        <span>{(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
                     </div>
                  ))}
                  <div className="pt-4 mt-2 border-t border-border font-bold text-lg flex justify-between">
                     <span>{t('common:arithmetic.total')}:</span>
                     <span className="text-primary">{totalPrice.toLocaleString('vi-VN')} đ</span>
                  </div>
               </div>
            )}

            <Button size="sm" variant="primary" onClick={() => setIsPayModal(true)}>
               Thanh toán
            </Button>

            <Modal
               isOpen={isPayModal}
               onClose={() => setIsPayModal(false)}
               size="md"
               title={`${t('common:actions.pay')}`}
               confirmText={`${t('common:buttons.confirm')}`}
               cancelText={`${t('common:buttons.cancel')}`}
               onConfirm={togglePay}
               isConfirmLoading={isPaying}
               fullScreenOnMobile={true}
            >
               {cartItems.length === 0 ? (
                  <p className="text-secondary">{t('cart.empty')}.</p>
               ) : (
                  <div className="flex flex-col gap-3">
                     {cartItems.map((item) => (
                        <div key={item.id} className="flex text-primary justify-between space-x-30">
                           <span>
                              {item.quantity}x {item.name}
                           </span>
                           <span>{(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
                        </div>
                     ))}
                     <div className="pt-4 mt-2 border-t border-border font-bold text-lg flex justify-between">
                        <span>{t('common:arithmetic.total')}:</span>
                        <span className="text-primary">{totalPrice.toLocaleString('vi-VN')} đ</span>
                     </div>
                  </div>
               )}
            </Modal>
         </div>
      </div>
   );
}
