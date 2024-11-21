import { useContext, useMemo } from 'react';

import { TreeContext } from 'contexts/TreeContext';
import { useSearchParams } from 'react-router-dom';

import TreeNode from 'components/TreeNode';

import { getNodeIdsBreadCrumbs } from 'utils/NodeHelpers';

import { TreeContextType } from 'types/index';

const Tree = () => {
  const { treeData } = useContext(TreeContext) as TreeContextType;

  const [searchParams] = useSearchParams();

  const id = searchParams.get('id') || '';

  const defaultExpandedNodesIds = useMemo(
    () => getNodeIdsBreadCrumbs(treeData, id).reduce((acc, id) => ({ ...acc, [id]: true }), {}),
    [treeData, id],
  );

  return treeData.map((node) => (
    <TreeNode key={node.id} node={node} defaultExpandedNodesIds={defaultExpandedNodesIds} />
  ));
};

export default Tree;
