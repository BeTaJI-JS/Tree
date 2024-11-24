import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useLocalStorage } from 'hooks/useLocalStorage';
import { useSearchParams } from 'react-router-dom';

import { loadData, saveData } from 'utils/LocalStorageHelpers';
import { deleteNodeById, editNodeById, getNodeById } from 'utils/NodeHelpers';

import { TreeContextType } from 'types';

import { data } from 'data';

const TreeContext = React.createContext<TreeContextType | null>(null);

const TreeProvider = ({ children }: { children: React.ReactNode }) => {
  const [treeData, setTreeData] = useLocalStorage('treeData', data);
  const [newItemType, setNewItemType] = useState<string | null>(null);
  const [isEditNode, setIsEditNode] = useState<boolean>(false);

  const [searchParams] = useSearchParams();

  const selectedNodeId = searchParams.get('id');

  const deleteNodeItem = useCallback(() => {
    if (selectedNodeId) {
      deleteNodeById(treeData, selectedNodeId);
      setTreeData((prev) => [...prev]);
    }
  }, [selectedNodeId, treeData, setTreeData]);

  const editNodeItem = useCallback(
    (newName: string) => {
      if (selectedNodeId) {
        editNodeById(treeData, selectedNodeId, newName);

        setTreeData((prev) => [...prev]);
        setIsEditNode(false);
      }
    },
    [selectedNodeId, treeData, setTreeData],
  );

  const selectedNode = useMemo(() => {
    return selectedNodeId ? getNodeById(treeData, selectedNodeId) : null;
  }, [treeData, selectedNodeId]);

  const contextValues = useMemo(
    () => ({
      treeData,
      setTreeData,
      newItemType,
      setNewItemType,
      selectedNode,
      deleteNodeItem,
      editNodeItem,
      isEditNode,
      setIsEditNode,
    }),
    [
      treeData,
      setTreeData,
      newItemType,
      setNewItemType,
      selectedNode,
      deleteNodeItem,
      editNodeItem,
      isEditNode,
      setIsEditNode,
    ],
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
  }, [setTreeData]);

  return <TreeContext.Provider value={contextValues}>{children}</TreeContext.Provider>;
};

export { TreeProvider, TreeContext };
