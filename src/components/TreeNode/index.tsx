import { useContext, useState } from 'react';

import { TreeContext } from 'contexts/TreeContext';
import { TreeNodeProps, TreeContextType } from 'types/index';

import ActiveTreeNode from './ActiveTreeNode';
import SimpleTreeNode from './SimpleTreeNode';

const TreeNode = ({ node, onSelect }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const { selectedNode } = useContext(TreeContext) as TreeContextType;

  return selectedNode?.id === node.id ? (
    <ActiveTreeNode node={node} onSelect={onSelect} isOpen={isOpen} toggleOpen={toggleOpen} />
  ) : (
    <SimpleTreeNode node={node} onSelect={onSelect} isOpen={isOpen} toggleOpen={toggleOpen} />
  );
};

export default TreeNode;
