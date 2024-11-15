import { useContext, useEffect, useState } from 'react';

import cn from 'classnames';
import { TreeContext } from 'contexts/TreeContext';
import { CustomTreeNodeProps, Node, TreeContextType } from 'types/index';
import { setUniqId } from 'utils/index';
import { editNodeById } from 'utils/NodeHelpers';

import styles from './styles.module.scss';

import TreeNode from '.';

const ActiveTreeNode = ({ node, onSelect, isOpen, toggleOpen }: CustomTreeNodeProps) => {
  const { treeData, setTreeData, newItemType, setNewItemType, isEditNode, setIsEditNode, selectedNode } = useContext(
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
      editNodeById(treeData, selectedNode?.id, newName);
      setIsEditNode(false);
    }
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
            <span>
              {isOpen ? (
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <g opacity='0.8'>
                    <path
                      d='M16.354 10.354L12.354 14.354C12.256 14.452 12.128 14.5 12 14.5C11.872 14.5 11.744 14.451 11.646 14.354L7.64601 10.354C7.45101 10.159 7.45101 9.84198 7.64601 9.64698C7.84101 9.45198 8.15804 9.45198 8.35304 9.64698L11.999 13.293L15.645 9.64698C15.84 9.45198 16.1571 9.45198 16.3521 9.64698C16.5471 9.84198 16.549 10.158 16.354 10.354Z'
                      fill='#FAFAFA'
                    />
                  </g>
                </svg>
              ) : (
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <g opacity='0.8'>
                    <path
                      d='M14.354 12.3543L10.354 16.3543C10.256 16.4523 10.128 16.5003 10 16.5003C9.87201 16.5003 9.74401 16.4513 9.64601 16.3543C9.45101 16.1593 9.45101 15.8422 9.64601 15.6472L13.292 12.0012L9.64601 8.35523C9.45101 8.16023 9.45101 7.8432 9.64601 7.6482C9.84101 7.4532 10.158 7.4532 10.353 7.6482L14.353 11.6482C14.549 11.8422 14.549 12.1583 14.354 12.3543Z'
                      fill='#FAFAFA'
                    />
                  </g>
                </svg>
              )}
            </span>
          )}
          <span>{node.name}</span>
        </div>
      </div>
      {!!newItemType && node.id === selectedNode?.id && (
        <input
          type='text'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleAddNewItem}
          onKeyDown={(e) => e.key === 'Enter' && handleAddNewItem()}
          autoFocus
        />
      )}
      {isEditNode && (
        <input
          type='text'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleEditNode}
          onKeyDown={(e) => e.key === 'Enter' && handleEditNode()}
          autoFocus
        />
      )}

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
