import { useQuery } from '@tanstack/react-query';
import { type MenuItem } from '@self-ordering/types';
import { Button } from '@self-ordering/ui';
import { useCartStore } from '@/features/cart/hooks/useCartStore';

// Giả lập một hàm gọi API (Sau này sẽ thay bằng fetch/axios gọi NestJS)
const fetchMenu = async (): Promise<MenuItem[]> => {
   await new Promise((resolve) => setTimeout(resolve, 1000));
   return [
      { id: '1', name: 'Phở Bò', price: 45000 },
      { id: '2', name: 'Bánh Mì Thịt Nướng', price: 25000 },
      { id: '3', name: 'Trà Đá', price: 5000 },
   ];
};

const App = () => {
   // 1. Lấy dữ liệu từ API bằng React Query (Server State)
   const { data: menuItems, isLoading, isError } = useQuery({ queryKey: ['menu'], queryFn: fetchMenu });

   // 2. Lấy dữ liệu và actions từ Zustand (Client State)
   const cartItems = useCartStore((state) => state.items);
   const totalPrice = useCartStore((state) => state.totalPrice);
   const addItem = useCartStore((state) => state.addItem);
   const removeItem = useCartStore((state) => state.removeItem);

   if (isLoading) return <div className="p-10 text-center">Đang tải thực đơn...</div>;
   if (isError) return <div className="p-10 text-center text-red-500">Lỗi tải dữ liệu!</div>;

   return (
      <div className="max-w-4xl mx-auto p-6 grid grid-cols-2 gap-8">
         <div>
            <h1 className="text-2xl font-bold mb-4">Thực đơn</h1>
            <div className="flex flex-col gap-4">
               {menuItems?.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg flex justify-between items-center shadow-sm">
                     <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">{item.price.toLocaleString('vi-VN')} đ</p>
                     </div>
                     <div className="flex gap-1">
                        <Button onClick={() => addItem(item)} variant="primary" size="sm">
                           +
                        </Button>
                        <Button onClick={() => removeItem(item.id)} variant="danger" size="sm">
                           -
                        </Button>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-xl font-bold mb-4">Giỏ hàng ({cartItems.length} món)</h2>

            {cartItems.length === 0 ? (
               <p className="text-gray-500">Chưa có món nào trong giỏ.</p>
            ) : (
               <div className="flex flex-col gap-3">
                  {cartItems.map((item) => (
                     <div key={item.id} className="flex justify-between border-b pb-2">
                        <span>
                           {item.quantity}x {item.name}
                        </span>
                        <span>{(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
                     </div>
                  ))}
                  <div className="pt-4 mt-2 border-t border-gray-300 font-bold text-lg flex justify-between">
                     <span>Tổng cộng:</span>
                     <span className="text-blue-600">{totalPrice.toLocaleString('vi-VN')} đ</span>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default App;
