import { CustomTreeNodeProps } from 'types';

import styles from './styles.module.scss';

import TreeNode from '.';

const SimpleTreeNode = ({ node, onSelect, isOpen, toggleOpen, defaultExpandedNodesIds }: CustomTreeNodeProps) => {
  return (
    <>
      <div onClick={toggleOpen} className={styles.treeNodeContainer}>
        <div className={styles.treeNode} onClick={() => onSelect(node)}>
          {node.type === 'folder' && (
            <span>{isOpen ? <img src={'/openedArrow.svg'} /> : <img src={'/notOpenedArrow.svg'} />}</span>
          )}
          {node.type === 'folder' && <img src='/folderItem.svg' />}
          <span>{node.name}</span>
        </div>
      </div>
      {isOpen && node.children && (
        <div className={styles.treeChildNodeContainer}>
          {node.children
            .sort((a) => (a.type === 'folder' ? -1 : 1))
            .map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                onSelect={onSelect}
                defaultExpandedNodesIds={defaultExpandedNodesIds}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default SimpleTreeNode;
