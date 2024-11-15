import { useCallback, useContext } from 'react';

import { TreeContext } from 'contexts/TreeContext';
import { Node, TreeProps } from 'types/index';

import TreeNode from 'components/TreeNode';

const Tree = ({ data }: TreeProps) => {
  const { setSelectedNodeId, selectedNode } = useContext(TreeContext)!;

  const handleSelect = useCallback(
    (selectedNode: Node) => {
      setSelectedNodeId(selectedNode.id);
    },
    [setSelectedNodeId],
  );

  return (
    <div>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} onSelect={handleSelect} selectedNodeId={selectedNode?.id} />
      ))}
    </div>
  );
};

export default Tree;
