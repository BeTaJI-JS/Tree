import { useCallback, useContext } from 'react';

import { TreeContext } from 'contexts/TreeContext';

import TreeNode from 'components/TreeNode';

import { Node, TreeProps } from 'types/index';

const Tree = ({ data }: TreeProps) => {
  const { setSelectedNodeId, selectedNode } = useContext(TreeContext)!;

  const handleSelect = useCallback(
    (selectedNode: Node) => {
      setSelectedNodeId(selectedNode.id);
    },
    [setSelectedNodeId],
  );

  return (
    <>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} onSelect={handleSelect} selectedNodeId={selectedNode?.id} />
      ))}
    </>
  );
};

export default Tree;
