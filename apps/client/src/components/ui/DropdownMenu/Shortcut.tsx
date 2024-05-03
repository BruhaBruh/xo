'use client';

import { cn } from '@/lib/shadcn';
import React from 'react';

export const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
    {...props}
  />
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';
