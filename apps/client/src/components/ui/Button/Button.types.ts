import { PropsWithAsChild } from '@/types/props';
import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './Button.variants';

export type ButtonProps = PropsWithAsChild<'button'> &
  VariantProps<typeof buttonVariants>;
