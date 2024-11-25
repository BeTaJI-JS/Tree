import { useContext, useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';

import { TreeContext } from 'contexts/TreeContext';

import TreeNode from 'components/TreeNode';

import InputNode from 'fragments/InputNode';

import { getNodeIdsBreadCrumbs, handleAddNewItem } from 'utils/NodeHelpers';

import { TreeContextType } from 'types';

const Tree = () => {
  const { treeData, setTreeData, newItemType, setNewItemType } = useContext(TreeContext) as TreeContextType;

  const [searchParams] = useSearchParams();

  const currentNodeId = searchParams.get('id') || '';

  const handleAddNewItemCallback = (newName: string) => {
    handleAddNewItem(treeData, setTreeData, currentNodeId, newName, newItemType, setNewItemType);
  };

  const defaultExpandedNodesIds = useMemo(
    () => getNodeIdsBreadCrumbs(treeData, currentNodeId).reduce((acc, id) => ({ ...acc, [id]: true }), {}),
    [treeData, currentNodeId],
  );

  return (
    <>
      {treeData.map((node) => (
        <TreeNode key={node.id} node={node} defaultExpandedNodesIds={defaultExpandedNodesIds} />
      ))}
      {!currentNodeId ||
        (currentNodeId === 'Rootindex' && newItemType && (
          <InputNode
            valueInput={newItemType === 'folder' ? 'Новая папка' : 'Новый файл'}
            handleNode={handleAddNewItemCallback}
          />
        ))}
    </>
  );
};

export default Tree;
