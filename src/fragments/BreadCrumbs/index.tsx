import { useCallback, useEffect, useMemo, useState } from 'react';

import { Node } from 'types/index';

import styles from './styles.module.scss';

type BreadCrumbsProps = {
  treeData: Node[];
  currentId: string | undefined;
};

const initialValuePath: string[] = ['Корень'];

const BreadCrumbs = ({ treeData, currentId }: BreadCrumbsProps) => {
  const [path, setPath] = useState<string[]>(initialValuePath);
  console.log('currentId', currentId);

  const findPath = useCallback((nodes: Node[], id: string, currentPath: string[] = initialValuePath): boolean => {
    for (const node of nodes) {
      const newPath = [...currentPath, node.name];

      // TODO является ли текущий узел тем, что мы ищем
      if (node.id === id) {
        setPath(newPath);
        return true;
      }

      // TODO  Если у узла есть дочерние элементы, продолжаем поиск в них
      if (node.children) {
        const found = findPath(node.children, id, newPath);
        if (found) return true;
      }
    }
    return false;
  }, []);

  //  отображение пути
  const renderPath = useMemo(() => {
    if (path.length === 1) {
      return `${path[0]} / `;
    }

    if (path.length > 5) {
      return `${path[0]} / ... / ... / ${path[path.length - 1]}`;
    }

    return path.join(' / ');
  }, [path]);

  useEffect(() => {
    if (currentId) {
      findPath(treeData, currentId);
    }
  }, [currentId, treeData, findPath]);

  return <div className={styles.breadCrumbs}>{renderPath}</div>;
};

export default BreadCrumbs;
