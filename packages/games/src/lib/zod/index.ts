import { z } from 'zod';

export const structureError = <T>(error: z.ZodError<T>): StructuredError<T> => {
  // primitive
  if (error.issues[0].path.length === 0) {
    return error.issues[0].message as StructuredError<T>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const errors: any = typeof error.issues[0].path[0] === 'string' ? {} : [];

  error.issues.forEach((issue) => {
    let target = errors;

    issue.path.forEach((path, index, arr) => {
      const nextPath = arr[index + 1];

      if (typeof nextPath === 'string') {
        if (target[path] === undefined) target[path] = {};
        target = target[path];

        return;
      }

      if (typeof nextPath === 'number') {
        if (target[path] === undefined) target[path] = [];
        target = target[path];

        return;
      }
      target[path] = issue.message;
    });
  });

  return errors as StructuredError<T>;
};

export type StructuredError<T> = T extends unknown[]
  ? Exclude<StructuredArrayError<T>, string | undefined>
  : T extends Record<string | number | symbol, unknown>
    ? Exclude<StructuredObjectError<T>, string | undefined>
    : string | undefined;

export type StructuredObjectError<
  T extends Record<string | number | symbol, unknown>,
> =
  | {
      [key in keyof T]?: StructuredError<T[key]>;
    }
  | string
  | undefined;

export type StructuredArrayError<
  TArray extends unknown[],
  T = TArray[number],
> = (StructuredError<T> | string | undefined)[] | string | undefined;
