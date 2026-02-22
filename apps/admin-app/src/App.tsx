import { Button } from '@self-ordering/ui';

function App() {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
         <h1 className="text-2xl font-bold">Menu Khách Hàng</h1>

         <Button variant="primary" onClick={() => alert('Đã thêm vào giỏ!')}>
            Thêm vào giỏ hàng
         </Button>

         <Button variant="secondary">Quay lại</Button>
      </div>
   );
}

export default App;
