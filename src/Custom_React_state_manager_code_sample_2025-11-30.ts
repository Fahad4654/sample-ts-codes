import { useState, useCallback, useSyncExternalStore } from 'react';

interface Store<T> {
  getState: () => T;
  setState: (newState: T) => void;
  subscribe: (listener: () => void) => () => void;
}

function createStore<T>(initialState: T): Store<T> {
  let state = initialState;
  let listeners: (() => void)[] = [];

  return {
    getState: () => state,
    setState: (newState: T) => {
      state = newState;
      listeners.forEach(listener => listener());
    },
    subscribe: (listener: () => void) => {
      listeners = [...listeners, listener];
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    },
  };
}

function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(store.subscribe, store.getState);
}

function useBoundSetState<T>(store: Store<T>): (newState: T) => void {
  return useCallback((newState: T) => store.setState(newState), [store]);
}

export { createStore, useStore, useBoundSetState };