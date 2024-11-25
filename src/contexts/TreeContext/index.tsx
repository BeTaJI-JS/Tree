import React, { useCallback, useMemo, useState } from 'react';

import { useLocalStorage } from 'hooks/useLocalStorage';
import { useSearchParams } from 'react-router-dom';

import { deleteNodeById, editNodeById, getNodeById } from 'utils/NodeHelpers';

import { TreeContextType } from 'types';

import { mockData } from 'data';

const TreeContext = React.createContext<TreeContextType | null>(null);

const TreeProvider = ({ children }: { children: React.ReactNode }) => {
  const [treeData, setTreeData] = useLocalStorage('treeData', mockData);
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

  return <TreeContext.Provider value={contextValues}>{children}</TreeContext.Provider>;
};

export { TreeProvider, TreeContext };
