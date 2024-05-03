'use client';

import { Header } from '@/components/widget';
import { cn } from '@/lib/shadcn';
import { ThemeProvider } from '@/providers/Theme';
import React from 'react';

const style = 'margin-right: 0px !important; overflow-x: hidden';

export const BaseLayout: React.FC<
  React.PropsWithChildren<{
    className?: string;
  }>
> = ({ className, children }) => {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const body = document.body as HTMLBodyElement;

    const interval = setInterval(() => {
      const styleWithoutStyleUpdaterStyle = body.style.cssText.replaceAll(
        style,
        ''
      );
      body.style.cssText = `${styleWithoutStyleUpdaterStyle} ${style}`;
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={cn(className)} suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <main className="container py-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};
