import { useCallback, useEffect, useState } from 'react';

function useDebouncedState<T>(
  initialValue: T,
  delay = 200,
): [T, (value: T) => void, T] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  const setDebouncedState = useCallback((newValue: T) => {
    setValue(newValue);
  }, []);

  return [debouncedValue, setDebouncedState, value];
}

export default useDebouncedState;
