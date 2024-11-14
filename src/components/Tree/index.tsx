import { useCallback, useContext } from 'react';

import { TreeContext } from 'contexts/TreeContext';
import { Node, TreeProps } from 'types/index';

import TreeNode from 'components/TreeNode';

const Tree = ({ data }: TreeProps) => {
  const { selectedNodeId, setSelectedNodeId } = useContext(TreeContext);

  const handleSelect = useCallback(
    (node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId],
  );

  return (
    <div>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} onSelect={handleSelect} selectedNodeId={selectedNodeId} />
      ))}
    </div>
  );
};

export default Tree;
