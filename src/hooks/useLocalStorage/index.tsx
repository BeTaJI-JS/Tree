import { useEffect, useState } from 'react';

import { Node } from 'types';

export const useLocalStorage = (key: string, defaultValue?: Node[]) => {
  const [value, setValue] = useState<Node[]>(() => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue !== null) {
      const parsedValue = JSON.parse(jsonValue);
      if (parsedValue.length > 0) {
        return parsedValue;
      }
    }
    return defaultValue || [];
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setValue(JSON.parse(event.newValue || '[]'));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
