import { ChangeEventHandler, useContext, useEffect, useState } from 'react';

import cn from 'classnames';
import { TreeContext } from 'contexts/TreeContext';
import InputNode from 'fragments/InputNode';

import { setUniqId } from 'utils/index';

import { CustomTreeNodeProps, Node, TreeContextType } from 'types/index';

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
  const [newName, setNewName] = useState('');

  const { treeData, setTreeData, newItemType, setNewItemType, isEditNode, editNodeItem } = useContext(
    TreeContext,
  ) as TreeContextType;

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

      const newTreeData = addFolderToNode(treeData, selectedNodeId, newItem);
      setTreeData(newTreeData);
      setNewName('');
      setNewItemType('');
    }
  };
  const addFolderToNode = (nodes: Node[], selectedId: string | undefined, newItem: Node): Node[] => {
    return nodes.map((node) => {
      if (node.id === selectedId && node.type !== 'file') {
        return {
          ...node,
          children: [...(node.children || []), newItem],
        };
      }
      if (node.children) {
        return {
          ...node,
          children: addFolderToNode(node.children, selectedId, newItem),
        };
      }
      return node;
    });
  };

  const handleEditNode = () => {
    if (selectedNodeId) {
      editNodeItem(newName);
    }
  };

  const onChangeInputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewName(e.target.value);
  };

  useEffect(() => {
    if (newItemType && node.id === selectedNodeId) {
      setNewName(newItemType === 'folder' ? 'Новая папка' : 'Новый файл');
    }
  }, [newItemType, node.id, selectedNodeId]);

  return (
    <>
      <div
        onClick={toggleOpen}
        className={cn(selectedNodeId === node.id && styles.activeNode, styles.treeNodeContainer)}
      >
        <div className={styles.treeNode} onClick={() => onSelect(node)}>
          {node.type === 'folder' && (
            <span>{isOpen ? <img src={'/openedArrow.svg'} /> : <img src={'/notOpenedArrow.svg'} />}</span>
          )}
          <span>{node.name}</span>
        </div>
      </div>
      {!!newItemType && node.id === selectedNodeId && (
        <InputNode valueInput={newName} handleNode={handleAddNewItem} onChange={onChangeInputHandler} />
      )}
      {isEditNode && <InputNode valueInput={newName} handleNode={handleEditNode} onChange={onChangeInputHandler} />}
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
