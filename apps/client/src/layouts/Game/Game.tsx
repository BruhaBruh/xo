import { OIcon, XIcon } from '@/components/ui';
import { cn } from '@/lib/shadcn';
import React from 'react';

export const GameLayout: React.FC<
  React.PropsWithChildren<{
    title: string;
    withoutVersus?: boolean;
    xNickname?: string;
    oNickname?: string;
  }>
> = ({ title, withoutVersus, xNickname, oNickname, children }) => (
  <>
    <h1 className="mb-2 text-center typography-small sm:typography-large">
      {title}
    </h1>
    {!withoutVersus && (
      <h2
        className={cn(
          'typography-h4 flex flex-col sm:flex-row items-center justify-center sm:gap-2 mb-2 relative w-full mx-auto max-w-full',
          !xNickname && !oNickname && 'flex-row'
        )}
      >
        <div className="flex items-center self-stretch gap-1 relative">
          <XIcon className="h-8 w-8 min-h-8 min-w-8" />
          {xNickname && (
            <span className="truncate max-w-[calc(100%-2rem)]">
              {xNickname}
            </span>
          )}
        </div>
        <div
          className={cn(
            'self-center hidden sm:block',
            !xNickname && !oNickname && 'block'
          )}
        >
          vs
        </div>
        <div className="flex items-center self-stretch gap-1 relative">
          <OIcon className="h-8 w-8 min-h-8 min-w-8 sm:order-1" />
          {oNickname && (
            <span className="truncate max-w-[calc(100%-2rem)]">
              {oNickname}
            </span>
          )}
        </div>
      </h2>
    )}
    {children}
  </>
);
