import { Tuple } from '../types';

export const repeat = <T, N extends number>(value: T, times: N): Tuple<T, N> =>
  new Array(times).fill(null).map(() => structuredClone(value)) as Tuple<T, N>;
