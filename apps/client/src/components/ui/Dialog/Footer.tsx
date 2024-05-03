'use client';

import { cn } from '@/lib/shadcn';
import React from 'react';

export const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end gap-2',
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';
