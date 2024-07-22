import { useCallback, useEffect, useState } from 'react';

function useDebouncedState<T>(initialValue: T, delay = 500) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

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
