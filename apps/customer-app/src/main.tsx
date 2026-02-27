import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@self-ordering/ui';

import './index.css';
import '@/i18n';
import App from './App.tsx';
import { queryClient } from '@/lib/react-query';

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <QueryClientProvider client={queryClient}>
         <ThemeProvider>
            <App />
         </ThemeProvider>
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   </StrictMode>
);
