'use client';

import { cn } from '@/lib/shadcn';
import { VariantProps } from 'class-variance-authority';
import { Circle } from 'lucide-react';
import React from 'react';
import { oiconVariants } from './OIcon.variants';

export const OIcon: React.FC<
  {
    className?: string;
  } & VariantProps<typeof oiconVariants>
> = ({ className, size }) => (
  <span className={cn(oiconVariants({ size }), className)}>
    <Circle className="h-3/4 w-3/4 stroke-[4] text-red-500" />
  </span>
);
