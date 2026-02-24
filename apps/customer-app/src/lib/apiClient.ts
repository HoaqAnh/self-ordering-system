import { createApiClient } from '@self-ordering/api';
import { useCartStore } from '@/features/cart/hooks/useCartStore';

const baseURL = import.meta.env.VITE_API_URL;

export const apiClient = createApiClient({
   baseURL,
   getToken: () => localStorage.getItem('customer_access_token'),
   onUnauthorized: () => {
      console.warn('Phiên đăng nhập hết hạn!');
      localStorage.removeItem('customer_access_token');
      useCartStore.getState().clearCart();
      // window.location.href = '/login';
   },
});
