import { useEffect, useState } from 'react';

interface State<T> {
  data: T | undefined;
  isLoading: boolean;
  isUninitialized: boolean;
  isError: boolean;
  error: Error | undefined;
}

type Listener<T> = (state: State<T>) => void;

export class SimpleApiState<T> {
  private data: T | undefined;
  private isLoading = false;
  private isUninitialized = true;
  private isError = false;
  private error: Error | undefined;
  private listeners: Listener<T>[] = [];

  constructor(
    private url: string,
    private prefetch = false,
  ) {
    if (this.prefetch) {
      this.fetchData();
    }
  }

  private fetchData = async () => {
    this.isUninitialized = false;
    this.isLoading = true;
    this.onChange();

    try {
      const response = await fetch(this.url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      this.data = (await response.json()) as T;
    } catch (e) {
      this.data = undefined;
      this.isError = true;

      if (e instanceof Error) {
        this.error = e;
      } else {
        this.error = new Error('Unknown error');
      }
    }

    this.isLoading = false;

    this.onChange();
  };

  private onChange = (): void => {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  };

  public getState = (): State<T> => ({
    data: this.data,
    isLoading: this.isLoading,
    isUninitialized: this.isUninitialized,
    isError: this.isError,
    error: this.error,
  });

  public listen = (listener: Listener<T>): void => {
    if (!this.prefetch && this.data === undefined) {
      this.fetchData();
    }

    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  };

  public unlisten = (listener: Listener<T>): void => {
    this.listeners = this.listeners.filter((l) => l !== listener);
  };
}

export const useSimpleApiState = <T>(store: SimpleApiState<T>): State<T> => {
  const [state, setState] = useState<State<T>>(store.getState());

  useEffect(() => {
    store.listen(setState);

    return () => store.unlisten(setState);
  }, [store]);

  return state;
};
