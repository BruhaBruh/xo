import { cva } from 'class-variance-authority';

export const drawiconVariants = cva(
  'w-10 h-10 inline-flex items-center justify-center',
  {
    variants: {
      size: {
        text: 'h-10 w-10',
        field: 'h-[90%] w-[90%]',
      },
    },
    defaultVariants: {
      size: 'text',
    },
  }
);
