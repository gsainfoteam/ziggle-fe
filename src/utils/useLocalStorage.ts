import { useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  parse: (value: string) => T = JSON.parse,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to write to localStorage for key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
