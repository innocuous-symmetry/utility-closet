export type Callable<
    TReturn = void,
    TArgs extends unknown[] = unknown[]
> = (...args: TArgs) => TReturn;

export type Maybe<T> = T | null | undefined;
