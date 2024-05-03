export type Tuple<
  T,
  N extends number = 2,
  Acc extends T[] = [],
> = Acc['length'] extends N ? Acc : Tuple<T, N, [...Acc, T]>;
