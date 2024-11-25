import { memo } from 'react';

import TreeNode from 'components/TreeNode';

import { Node, TreeNodeProps } from 'types';

type ChildrenNodesProps = Omit<TreeNodeProps, 'node'> & {
  node: Node[];
};

const ChildrenNodes = memo(({ node, onSelect, selectedNodeId, defaultExpandedNodesIds }: ChildrenNodesProps) => {
  if (!node) {
    return null;
  }

  return node
    .sort((a) => (a.type === 'folder' ? -1 : 1))
    .map((child: Node) => (
      <TreeNode
        key={child.id}
        node={child}
        onSelect={onSelect}
        selectedNodeId={selectedNodeId}
        defaultExpandedNodesIds={defaultExpandedNodesIds}
      />
    ));
});

export default ChildrenNodes;
