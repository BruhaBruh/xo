import React from 'react';

type AsChildProp = { asChild?: boolean };

export type Props<
  T extends
    | keyof React.JSX.IntrinsicElements
    | React.JSXElementConstructor<unknown>,
> = React.ComponentProps<T>;

export type PropsWithAsChild<
  T extends
    | keyof React.JSX.IntrinsicElements
    | React.JSXElementConstructor<unknown>,
> = Props<T> & AsChildProp;
