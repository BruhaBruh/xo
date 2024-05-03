'use client';

import { cn } from '@/lib/shadcn';
import { VariantProps } from 'class-variance-authority';
import { Frown } from 'lucide-react';
import React from 'react';
import { drawiconVariants } from './DrawIcon.variants';

export const DrawIcon: React.FC<
  {
    className?: string;
  } & VariantProps<typeof drawiconVariants>
> = ({ className, size }) => (
  <span className={cn(drawiconVariants({ size }), className)}>
    <Frown className="h-3/4 w-3/4 stroke-[2.5]" />
  </span>
);
