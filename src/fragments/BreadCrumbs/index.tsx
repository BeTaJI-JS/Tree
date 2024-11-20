import { useCallback, useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { Node } from 'types/index';

import styles from './styles.module.scss';

type BreadCrumbsProps = {
  treeData?: Node[];
  currentId: string | undefined;
};

const initialValuePath: string[] = ['Корень'];
const initialValueIdPath: string[] = ['Rootindex'];

const BreadCrumbs = ({ treeData, currentId }: BreadCrumbsProps) => {
  const [path, setPath] = useState<string[]>(initialValuePath);
  const [ids, setIds] = useState<string[]>(initialValueIdPath);

  const setSearchParams = useSearchParams()[1];

  const findPath = useCallback(
    (
      nodes: Node[],
      id: string,
      currentPath: string[] = initialValuePath,
      currentIds: string[] = initialValueIdPath,
    ): boolean => {
      for (const node of nodes) {
        const newPath = [...currentPath, node.name];
        const newIds = [...currentIds, node.id];

        if (node.id === id) {
          setPath(newPath);
          setIds(newIds);
          return true;
        }

        if (node.children) {
          const found = findPath(node.children, id, newPath, newIds);
          if (found) return true;
        }
      }
      return false;
    },
    [],
  );

  useEffect(() => {
    if (currentId && treeData) {
      findPath(treeData, currentId);
    } else {
      setPath(initialValuePath);
      setIds(initialValueIdPath);
    }
  }, [currentId, treeData, findPath]);

  const renderPath = useMemo(() => {
    return path.map((name, index) => {
      const id = ids[index];

      if (path.length > 5) {
        if (index === 0 || index === path.length - 1 || index === path.length - 2) {
          return (
            <span key={id} className={styles.breadcrumb} onClick={() => setSearchParams({ id })}>
              {name}
              {index < path.length - 1 && ' / '}
            </span>
          );
        } else if (index === 1) {
          return <span key={id}>... / ... / </span>;
        }

        return null;
      }

      return (
        <span key={id} className={styles.breadcrumb} onClick={() => setSearchParams({ id })}>
          {name}
          {index < path.length - 1 && ' / '}
        </span>
      );
    });
  }, [path, ids, setSearchParams]);

  // useEffect(() => { старый вариант без рута
  //   if (currentId) {
  //     findPath(treeData, currentId);
  //   }
  // }, [currentId, treeData, findPath]);

  return <div className={styles.breadCrumbs}>{renderPath}</div>;
};

export default BreadCrumbs;
