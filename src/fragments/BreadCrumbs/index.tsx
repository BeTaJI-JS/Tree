import { useCallback, useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import { Node } from 'types';

import styles from './styles.module.scss';

type BreadCrumbsProps = {
  treeData?: Node[];
  currentId: string | undefined;
};

const initialValuePath: string[] = ['Корень'];
const initialValueIdPath: string[] = ['Rootindex'];

const BreadCrumbs = ({ treeData, currentId }: BreadCrumbsProps) => {
  const setSearchParams = useSearchParams()[1];

  const findPath = useCallback((nodes: Node[], id: string): { path: string[]; ids: string[] } | null => {
    const result: { path: string[]; ids: string[] } = { path: [], ids: [] };

    const intersection = (nodes: Node[], currentPath: string[], currentIds: string[]): void => {
      for (const node of nodes) {
        const newPath = [...currentPath, node.name];
        const newIds = [...currentIds, node.id];

        if (node.id === id) {
          result.path = newPath;
          result.ids = newIds;
          return;
        }

        if (node.children) {
          intersection(node.children, newPath, newIds);
        }
      }
    };

    intersection(nodes, initialValuePath, initialValueIdPath);
    return result.path.length > 0 ? result : null;
  }, []);

  const { path, ids } = useMemo(() => {
    if (currentId && treeData) {
      return findPath(treeData, currentId) || { path: initialValuePath, ids: initialValueIdPath };
    }
    return { path: initialValuePath, ids: initialValueIdPath };
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

  return <div className={styles.breadCrumbs}>{renderPath}</div>;
};

export default BreadCrumbs;
