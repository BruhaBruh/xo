import { BaseLayout } from '@/layouts/Base';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s - XO Games',
    default: 'XO Games',
  },
  icons: {
    icon: [
      {
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        type: 'image/png',
        url: '/favicon.png',
      },
    ],
  },
};

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <BaseLayout className={inter.variable}>{children}</BaseLayout>
);

export default Layout;
