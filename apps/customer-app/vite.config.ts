import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss()],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
   server: {
      port: 2222,
      strictPort: true,
      host: true,
      allowedHosts: ['dev.selforder.site'],
      proxy: {
         '/v1': {
            target: 'http://api.selforder.local:9898',
            changeOrigin: true,
         },
      },
   },
});
