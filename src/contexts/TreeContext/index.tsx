import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { data } from 'data/index';

import { loadData, saveData } from 'utils/LocalStorageHelpers';
import { deleteNodeById, editNodeById, getNodeById } from 'utils/NodeHelpers';

import { TreeContextType } from 'types/index';

const TreeContext = React.createContext<TreeContextType | null>(null);

const TreeProvider = ({ children }: { children: React.ReactNode }) => {
  const [treeData, setTreeData] = useState(loadData() || data); //!  удалить стейт со времененм и использовать только сторадж( на последок оставить)
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
      console.log('КЛИК редактрования');

      editNodeById(treeData, selectedNodeId, newName);

      setTreeData([...treeData]);
      setIsEditNode(false);
    },
    [selectedNodeId, treeData],
  );

  // TODO useEffect для проброса моков как initialValues  в localStorage
  useEffect(() => {
    if (!treeData.length) {
      saveData(data);
      return;
    }
    saveData([...treeData]);
  }, [treeData]);

  useEffect(() => {
    const storedData = loadData();
    if (storedData.length > 0) {
      setTreeData(storedData);
    }
  }, []);

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
