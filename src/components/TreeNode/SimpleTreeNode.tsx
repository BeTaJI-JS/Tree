import { memo } from 'react';

import { CustomTreeNodeProps } from 'types';

import ChildrenNodes from './ChildrenNodes';
import styles from './styles.module.scss';

const SimpleTreeNode = memo(
  ({ node, onSelect, isOpen, toggleOpen, defaultExpandedNodesIds, selectedNodeId }: CustomTreeNodeProps) => {
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

export default SimpleTreeNode;
