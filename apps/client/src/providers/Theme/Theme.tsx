'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import React from 'react';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  ...props
}) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    {...props}
  >
    {children}
  </NextThemesProvider>
);
