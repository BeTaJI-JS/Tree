import { useContext, useCallback, memo, useMemo } from 'react';

import cn from 'classnames';

import { TreeContext } from 'contexts/TreeContext';

import InputNode from 'fragments/InputNode';

import { handleAddNewItem } from 'utils/NodeHelpers';

import { CustomTreeNodeProps, TreeContextType } from 'types';

import ChildrenNodes from './ChildrenNodes';
import styles from './styles.module.scss';

const ActiveTreeNode = memo(
  ({ node, onSelect, isOpen, toggleOpen, selectedNodeId, defaultExpandedNodesIds }: CustomTreeNodeProps) => {
    const { treeData, setTreeData, newItemType, setNewItemType, isEditNode, editNodeItem } = useContext(
      TreeContext,
    ) as TreeContextType;

    const handleAddNewItemCallback = useCallback(
      (newName: string) => {
        handleAddNewItem(treeData, setTreeData, selectedNodeId, newName, newItemType, setNewItemType);
      },
      [treeData, setTreeData, selectedNodeId, newItemType, setNewItemType],
    );

    const handleEditNode = useCallback(
      (newName: string) => {
        if (selectedNodeId) {
          editNodeItem(newName);
        }
      },
      [selectedNodeId, editNodeItem],
    );

    const isShowInput = useMemo(
      () => !!isEditNode || (!!newItemType && node.id === selectedNodeId),
      [isEditNode, newItemType, node, selectedNodeId],
    );

    return (
      <>
        <div onClick={toggleOpen} className={styles.treeNodeContainer}>
          <div className={styles.treeNode} onClick={() => onSelect(node)}>
            {node.type === 'folder' && (
              <>
                <span>
                  <img src={isOpen ? '/openedArrow.svg' : '/notOpenedArrow.svg'} alt='Toggle' />
                </span>
                <img src='/folderItem.svg' alt='Folder' />
              </>
            )}
            <span className={cn(selectedNodeId === node.id && styles.activeNode)}>{node.name}</span>
          </div>
          {isShowInput && (
            <InputNode
              valueInput={isEditNode ? node.name : newItemType === 'folder' ? 'Новая папка' : 'Новый файл'}
              handleNode={isEditNode ? handleEditNode : handleAddNewItemCallback}
            />
          )}
        </div>
        {isOpen && node.children && (
          <div className={styles.treeChildNodeContainer}>
            <ChildrenNodes
              node={node.children}
              onSelect={onSelect}
              selectedNodeId={selectedNodeId}
              defaultExpandedNodesIds={defaultExpandedNodesIds}
            />
          </div>
        )}
      </>
    );
  },
);

export default ActiveTreeNode;
