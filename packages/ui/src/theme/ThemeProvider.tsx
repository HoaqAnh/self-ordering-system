import React, { useEffect } from 'react';
import { useThemeStore } from './useThemeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
   const theme = useThemeStore((state) => state.theme);

   useEffect(() => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');

      if (theme === 'system') {
         const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
         root.classList.add(systemTheme);
         root.style.colorScheme = systemTheme;
         return;
      }

      root.classList.add(theme);
      root.style.colorScheme = theme;
   }, [theme]);

   return <>{children}</>;
}
