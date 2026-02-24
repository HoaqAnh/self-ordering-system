import { createApiClient } from '@self-ordering/api';

const baseURL = import.meta.env.VITE_API_URL;

export const apiClient = createApiClient({
   baseURL,
   getToken: () => localStorage.getItem('customer_access_token'),
   onUnauthorized: () => {
      console.warn('Phiên đăng nhập hết hạn!');
      localStorage.removeItem('customer_access_token');
      window.location.href = '/login';
   },
});
