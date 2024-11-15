import React, { useCallback, useMemo, useState } from 'react';

import { data } from 'data/index';
import { TreeContextType } from 'types/index';
import { deleteNodeById, editNodeById, getNodeById } from 'utils/NodeHelpers';

const TreeContext = React.createContext<TreeContextType | null>(null);

// типизация children - ReactNode, потому что children - это
// реакт-элемент, который может быть как одиночным, так и массивом
const TreeProvider = ({ children }: { children: React.ReactNode }) => {
  const [treeData, setTreeData] = useState(data);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');
  const [newItemType, setNewItemType] = useState<string | null>(null);
  const [isEditNode, setIsEditNode] = useState<boolean>(false);

  const setNewItem = useCallback(
    (type: string) => {
      setNewItemType(type);
    },
    [setNewItemType],
  );

  const selectedNode = useMemo(() => {
    return getNodeById(treeData, selectedNodeId);
  }, [treeData, selectedNodeId]);

  const deleteNodeItem = useCallback(() => {
    deleteNodeById(treeData, selectedNodeId);
    setTreeData([...treeData]);
  }, [selectedNodeId, treeData]);

  const editNodeItem = useCallback(
    (newName: string) => {
      editNodeById(treeData, selectedNodeId, newName);
      setTreeData([...treeData]);
      setIsEditNode(false);
    },
    [selectedNodeId, treeData],
  );

  return (
    <TreeContext.Provider
      value={{
        treeData,
        setTreeData,
        setSelectedNodeId,
        setNewItem,
        newItemType,
        setNewItemType,
        selectedNode,
        deleteNodeItem,
        editNodeItem,
        isEditNode,
        setIsEditNode,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};

export { TreeProvider, TreeContext };
