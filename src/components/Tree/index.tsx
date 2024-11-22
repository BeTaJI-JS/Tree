import { useContext, useMemo, useState } from 'react';

import { TreeContext } from 'contexts/TreeContext';
import InputNode from 'fragments/InputNode';
import { useSearchParams } from 'react-router-dom';

import TreeNode from 'components/TreeNode';

import { setUniqId } from 'utils/index';
import { getNodeIdsBreadCrumbs } from 'utils/NodeHelpers';

import { Node, TreeContextType } from 'types/index';

const Tree = () => {
  const { treeData, setTreeData, newItemType, setNewItemType } = useContext(TreeContext) as TreeContextType;

  const [newName, setNewName] = useState('');

  const [searchParams] = useSearchParams();

  const currentNodeId = searchParams.get('id') || '';

  const defaultExpandedNodesIds = useMemo(
    () => getNodeIdsBreadCrumbs(treeData, currentNodeId).reduce((acc, id) => ({ ...acc, [id]: true }), {}),
    [treeData, currentNodeId],
  );

  const handleAddNewItem = () => {
    if (newName.trim()) {
      const newItem: Node = {
        id: setUniqId(),
        name: newName,
        type: newItemType as 'file' | 'folder',
      };

      if (newItemType === 'folder') {
        newItem.children = [];
      }

      // const newTreeData = addFolderToNode(treeData, selectedNodeId, newItem);
      setTreeData([...treeData, newItem]);
      setNewName('');
      setNewItemType('');
    }
  };

  return (
    <>
      {treeData.map((node) => (
        <TreeNode key={node.id} node={node} defaultExpandedNodesIds={defaultExpandedNodesIds} />
      ))}
      {!currentNodeId ||
        (currentNodeId === 'Rootindex' && newItemType && (
          <InputNode valueInput={newName} handleNode={handleAddNewItem} onChange={(e) => setNewName(e.target.value)} />
        ))}
    </>
  );
};

export default Tree;
