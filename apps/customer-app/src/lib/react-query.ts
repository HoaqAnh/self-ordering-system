import { QueryClient } from '@tanstack/react-query';

// Khởi tạo QueryClient với các cấu hình mặc định (Global Config)
export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false, // Không tự động gọi lại API khi user chuyển tab
         retry: 1, // Chỉ thử gọi lại 1 lần nếu API lỗi
         staleTime: 1000 * 60 * 5, // Dữ liệu được coi là "cũ" sau 5 phút
      },
   },
});
