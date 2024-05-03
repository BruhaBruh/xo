'use client';

import { cn } from '@/lib/shadcn';
import React from 'react';

export const InputField: React.FC<
  React.ComponentProps<'div'> & {
    description?: string | null;
    error?: string | null;
  }
> = ({ className, children, description, error, ...props }) => (
  <div className={cn('flex flex-col gap-1 w-full', className)} {...props}>
    <div className="flex flex-col gap-2">{children}</div>
    {(error || description) && (
      <p
        className={cn(
          'typography-muted',
          error ? 'text-destructive' : 'text-muted-foreground'
        )}
      >
        {error || description}
      </p>
    )}
  </div>
);
