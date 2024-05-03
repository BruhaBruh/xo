import React from 'react';

export type UseStoreAction<State> = <Return = State>(
  selector?: (store: State) => Return
) => [
  Return,
  (value: Partial<State> | ((prev: State) => Partial<State>)) => void,
];

export const createFastContext = <
  T extends Record<string | number | symbol, unknown>,
>(
  ssrState: T,
  name: string = ''
) => {
  const useCreateStore = (initialState: T) => {
    const store = React.useRef(initialState);
    const subscribers = React.useRef(new Set<() => void>());

    const get = React.useCallback(() => store.current, []);

    const set = React.useCallback((value: Partial<T>) => {
      store.current = { ...store.current, ...value };
      subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = React.useCallback((callback: () => void) => {
      subscribers.current.add(callback);

      return () => subscribers.current.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  };

  type UseCreateStoreReturn = ReturnType<typeof useCreateStore>;

  const StoreContext = React.createContext<UseCreateStoreReturn | null>(null);

  const Provider: React.FC<{
    value: T;
    children: React.ReactNode;
  }> = ({ value, children }) => {
    const store = useCreateStore(value);

    return (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
  };

  const useStore = <State extends T, Return = State>(
    selector?: (store: State) => Return
  ): [
    Return,
    (value: Partial<State> | ((prev: State) => Partial<State>)) => void,
  ] => {
    const store = React.use(StoreContext);

    if (!store) {
      throw new Error(`${name} store not found`.trim());
    }

    const state = React.useSyncExternalStore(
      store.subscribe,
      () => (selector ? selector(store.get() as State) : store.get()),
      () => (selector ? selector(ssrState as State) : ssrState)
    );

    const set = (value: Partial<State> | ((prev: State) => Partial<State>)) => {
      if (typeof value === 'function') {
        store.set(value(store.get() as State));
      } else {
        store.set(value);
      }
    };

    return [state as Return, set];
  };

  return {
    Provider,
    useStore,
  };
};
