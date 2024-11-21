import { useContext, useEffect, useState } from 'react';

import { TreeContext } from 'contexts/TreeContext';
import { useParams, useSearchParams } from 'react-router-dom';

import TreeNode from 'components/TreeNode';

import { TreeContextType } from 'types/index';

const Tree = () => {
  const { treeData } = useContext(TreeContext) as TreeContextType;
  const [defaultExpandedNodesIds, setDefaultExpandedNodesIds] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState<boolean>(false);
  // console.log('defaultExpandedNodesIds', defaultExpandedNodesIds);
  console.log('treeData', treeData);

  const [searchParams] = useSearchParams();

  const id = searchParams.get('id');

  console.log('id', id);

  useEffect(() => {
    if (loaded) {
      return;
    }

    if (!id) {
      setLoaded(true);
      return;
    }

    const getNodeIdsBreadCrumbs = (nodes: Node[], id: string): string[] => {
      const node = nodes.find((node) => node.id === id);

      if (node) {
        return [id];
      }

      for (const node of nodes) {
        const res = getNodeIdsBreadCrumbs(node?.children || [], id);
        if (res.length) {
          return [...res, node.id];
        }
      }

      // if (node?.children) {
      //   for (let i = 0; i < nodes.length; i++) {
      //     const res = getNodeIdsBreadCrumbs(nodes[i].children, id);
      //     if (res.length) {
      //       return [...res, nodes[i].id];
      //     }
      //   }
      // }
      return [];
    };
    const ids = getNodeIdsBreadCrumbs(treeData, id);
    console.log(ids);

    setDefaultExpandedNodesIds(ids.reduce((acc, id) => ({ ...acc, [id]: true }), {}));

    setLoaded(true);
  }, [id, loaded, treeData]);

  if (!loaded) {
    return 'loading';
  }

  return treeData.map((node) => (
    <TreeNode key={node.id} node={node} defaultExpandedNodesIds={defaultExpandedNodesIds} />
  ));
};

export default Tree;
