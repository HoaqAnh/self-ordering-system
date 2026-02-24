import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios';

export interface ApiClientOptions extends CreateAxiosDefaults {
   getToken?: () => string | null; // Hàm lấy token từ Zustand
   onUnauthorized?: () => void; // Hàm xử lý khi token hết hạn
}

export const createApiClient = (options: ApiClientOptions): AxiosInstance => {
   const { getToken, onUnauthorized, ...axiosConfig } = options;

   const client = axios.create({
      timeout: 10000, // 10 giây
      headers: {
         'Content-Type': 'application/json',
      },
      ...axiosConfig,
   });

   client.interceptors.request.use(
      (config) => {
         if (getToken && config.headers) {
            const token = getToken();
            if (token) {
               config.headers.Authorization = `Bearer ${token}`;
            }
         }
         return config;
      },
      (error) => Promise.reject(error)
   );

   client.interceptors.response.use(
      (response) => {
         return response.data;
      },
      (error) => {
         if (error.response?.status === 401) {
            if (onUnauthorized) {
               onUnauthorized();
            }
         }
         return Promise.reject(error);
      }
   );

   return client;
};
