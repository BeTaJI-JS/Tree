import { useContext } from 'react';

import cn from 'classnames';

import { TreeContext } from 'contexts/TreeContext';

import InputNode from 'fragments/InputNode';

import { handleAddNewItem } from 'utils/NodeHelpers';

import { CustomTreeNodeProps, TreeContextType } from 'types';

import styles from './styles.module.scss';

import TreeNode from '.';

const ActiveTreeNode = ({
  node,
  onSelect,
  isOpen,
  toggleOpen,
  selectedNodeId,
  defaultExpandedNodesIds,
}: CustomTreeNodeProps) => {
  const { treeData, setTreeData, newItemType, setNewItemType, isEditNode, editNodeItem } = useContext(
    TreeContext,
  ) as TreeContextType;

  const handleAddNewItemCallback = (newName: string) => {
    handleAddNewItem(treeData, setTreeData, selectedNodeId, newName, newItemType, setNewItemType);
  };

  const handleEditNode = (newName: string) => {
    if (selectedNodeId) {
      editNodeItem(newName);
    }
  };

  return (
    <>
      <div onClick={toggleOpen} className={styles.treeNodeContainer}>
        <div className={styles.treeNode} onClick={() => onSelect(node)}>
          {node.type === 'folder' && (
            <>
              <span>{isOpen ? <img src={'/openedArrow.svg'} /> : <img src={'/notOpenedArrow.svg'} />}</span>
              <img src='/folderItem.svg' />
            </>
          )}
          <span className={cn(selectedNodeId === node.id && styles.activeNode)}>{node.name}</span>
        </div>
        {!!newItemType && node.id === selectedNodeId && (
          <InputNode
            valueInput={isEditNode ? node.name : newItemType === 'folder' ? 'Новая папка' : 'Новый файл'}
            handleNode={isEditNode ? handleEditNode : handleAddNewItemCallback}
          />
        )}
      </div>
      {isEditNode && <InputNode valueInput={node.name} handleNode={handleEditNode} />}
      {isOpen && node.children && (
        <div className={styles.treeChildNodeContainer}>
          {node.children
            .sort((a) => (a.type === 'folder' ? -1 : 1))
            .map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                onSelect={onSelect}
                selectedNodeId={selectedNodeId}
                defaultExpandedNodesIds={defaultExpandedNodesIds}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default ActiveTreeNode;
