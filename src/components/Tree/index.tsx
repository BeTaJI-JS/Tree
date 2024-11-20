import { useContext } from 'react';

import { TreeContext } from 'contexts/TreeContext';

import TreeNode from 'components/TreeNode';

import { TreeContextType } from 'types/index';

const Tree = () => {
  const { treeData } = useContext(TreeContext) as TreeContextType;

  return treeData.map((node) => <TreeNode key={node.id} node={node} />);
};

export default Tree;
