import { useCallback, useState } from 'react';

import { Node, TreeProps } from 'types/index';

import TreeNode from 'components/TreeNode';

const Tree = ({ data }: TreeProps) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');

  const handleSelect = useCallback((node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  return (
    <div>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} onSelect={handleSelect} selectedNodeId={selectedNodeId} />
      ))}
    </div>
  );
};

export default Tree;
