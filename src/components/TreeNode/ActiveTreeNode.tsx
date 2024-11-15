import { useContext, useEffect, useState } from 'react';

import cn from 'classnames';
import { TreeContext } from 'contexts/TreeContext';
import InputNode from 'fragments/InputNode';
import { CustomTreeNodeProps, Node, TreeContextType } from 'types/index';
import { setUniqId } from 'utils/index';

import styles from './styles.module.scss';

import TreeNode from '.';

const ActiveTreeNode = ({ node, onSelect, isOpen, toggleOpen }: CustomTreeNodeProps) => {
  const { treeData, setTreeData, newItemType, setNewItemType, isEditNode, selectedNode, editNodeItem } = useContext(
    TreeContext,
  ) as TreeContextType;

  const [newName, setNewName] = useState('');

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

      const newTreeData = addFolderToNode(treeData, selectedNode?.id, newItem);
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
    if (selectedNode?.id) {
      editNodeItem(newName);
    }
  };

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  useEffect(() => {
    if (newItemType && node.id === selectedNode?.id) {
      setNewName(newItemType === 'folder' ? 'Новая папка' : 'Новый файл');
    }
  }, [newItemType, node.id, selectedNode]);

  return (
    <>
      <div
        onClick={toggleOpen}
        className={cn(selectedNode && selectedNode.id === node.id && styles.activeNode, styles.treeNodeContainer)}
      >
        <div className={styles.treeNode} onClick={() => onSelect(node)}>
          {node.type === 'folder' && (
            <span>{isOpen ? <img src={'/openedArrow.svg'} /> : <img src={'/notOpenedArrow.svg'} />}</span>
          )}
          <span>{node.name}</span>
        </div>
      </div>
      {!!newItemType && node.id === selectedNode?.id && (
        <InputNode valueInput={newName} handleNode={handleAddNewItem} onChange={onChangeInputHandler} />
      )}
      {isEditNode && <InputNode valueInput={newName} handleNode={handleEditNode} onChange={onChangeInputHandler} />}
      {isOpen && node.children && (
        <div className={styles.treeChildNodeContainer}>
          {node.children
            .sort((a) => (a.type === 'folder' ? -1 : 1))
            .map((child) => (
              <TreeNode key={child.id} node={child} onSelect={onSelect} selectedNodeId={selectedNode?.id} />
            ))}
        </div>
      )}
    </>
  );
};

export default ActiveTreeNode;
