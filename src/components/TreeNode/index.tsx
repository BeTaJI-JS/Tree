import { useContext, useState } from 'react';

import { TreeContext } from 'contexts/TreeContext';
import { TreeNodeProps } from 'types/index';

import ActiveTreeNode from './ActiveTreeNode';
import SimpleTreeNode from './SimpleTreeNode';

const TreeNode = ({ node, onSelect }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const { selectedNodeId } = useContext(TreeContext);

  return selectedNodeId === node.id ? (
    <ActiveTreeNode node={node} onSelect={onSelect} isOpen={isOpen} toggleOpen={toggleOpen} />
  ) : (
    <SimpleTreeNode node={node} onSelect={onSelect} isOpen={isOpen} toggleOpen={toggleOpen} />
  );
};

export default TreeNode;
