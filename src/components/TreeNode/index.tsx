import { useCallback, useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { Node, TreeNodeProps } from 'types';

import ActiveTreeNode from './ActiveTreeNode';
import SimpleTreeNode from './SimpleTreeNode';

const TreeNode = ({ node, defaultExpandedNodesIds }: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(!!defaultExpandedNodesIds[node.id]);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentNodeId = useMemo(() => {
    return searchParams.get('id');
  }, [searchParams]);

  const toggleOpen = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleSelect = useCallback(
    (selectedNode: Node) => {
      setSearchParams({ id: selectedNode?.id });
    },
    [setSearchParams],
  );

  return currentNodeId === node.id || currentNodeId === 'Rootindex' ? (
    <ActiveTreeNode
      node={node}
      onSelect={handleSelect}
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      selectedNodeId={currentNodeId}
      defaultExpandedNodesIds={defaultExpandedNodesIds}
    />
  ) : (
    <SimpleTreeNode
      node={node}
      onSelect={handleSelect}
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      defaultExpandedNodesIds={defaultExpandedNodesIds}
    />
  );
};

export default TreeNode;
