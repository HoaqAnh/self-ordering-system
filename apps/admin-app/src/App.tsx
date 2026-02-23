import { Button } from '@self-ordering/ui';
import { useState } from 'react';

export default function App() {
   const [loading, setLoading] = useState(false);

   const handleSubmit = () => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
         alert('Thành công!');
      }, 2000);
   };
   return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
         <h1 className="text-2xl font-bold">Menu Khách Hàng</h1>
         <Button size="md" variant="primary" isLoading={loading} onClick={handleSubmit}>
            {loading ? 'Đang lưu...' : 'Lưu dữ liệu'}
         </Button>
         <Button size="sm" disabled variant="danger">
            X
         </Button>
      </div>
   );
}
