import { useState } from 'react';
import { Button, Modal } from '@self-ordering/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const { t } = useTranslation();

   const handleDelete = () => {
      setIsLoading(true);
      setTimeout(() => {
         setIsModalOpen(false);
         setIsLoading(false);
      }, 1000);
   };

   return (
      <div className="p-10">
         <Button onClick={() => setIsModalOpen(true)}>Mở Modal Xóa</Button>
         <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            size="sm"
            title={`${t('menu.inactive')}`}
            confirmText={`${t('common:buttons.remove')}`}
            cancelText={`${t('common:buttons.cancel')}`}
            confirmVariant="danger"
            onConfirm={handleDelete}
            isConfirmLoading={isLoading}
         >
            Hành động này không thể hoàn tác. Dữ liệu của sản phẩm sẽ bị xóa vĩnh viễn khỏi hệ thống.
         </Modal>
      </div>
   );
}
