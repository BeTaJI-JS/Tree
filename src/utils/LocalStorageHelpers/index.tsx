import { Node } from 'types';

export const saveData = (data: Node[]) => {
  localStorage.setItem('TreeData', JSON.stringify(data));
};

export const loadData = (): Node[] => {
  const data = localStorage.getItem('TreeData');
  return data ? JSON.parse(data) : [];
};
