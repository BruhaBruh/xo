'use client';

import { cn } from '@/lib/shadcn';
import { VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import React from 'react';
import { xiconVariants } from './XIcon.variants';

export const XIcon: React.FC<
  {
    className?: string;
  } & VariantProps<typeof xiconVariants>
> = ({ className, size }) => (
  <span className={cn(xiconVariants({ size }), className)}>
    <X className="h-full w-full stroke-[4] text-blue-500" />
  </span>
);
