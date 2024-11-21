import { useEffect, useState } from 'react';

import { Node } from 'types/index';

export const useLocalStorage = (key: string, defaultValue?: Node[]) => {
  const [value, setValue] = useState<Node[]>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (defaultValue) return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
