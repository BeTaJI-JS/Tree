import React, { useMemo, useState } from 'react';

import { data } from 'data/index';
import { deleteNodeById, editNodeById, getNodeById } from 'utils/NodeHelpers';

const TreeContext = React.createContext({});

// типизация children - ReactNode, потому что children - это
// реакт-элемент, который может быть как одиночным, так и массивом
const TreeProvider = ({ children }: { children: React.ReactNode }) => {
  const [treeData, setTreeData] = useState(data);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');
  const [newItemType, setNewItemType] = useState<string | null>(null);
  const [isEditNode, setIsEditNode] = useState<boolean>(false);

  const setNewItem = (type: string) => {
    setNewItemType(type);
  };

  const selectedNode = useMemo(() => {
    return getNodeById(treeData, selectedNodeId);
  }, [treeData, selectedNodeId]);

  const deleteNodeItem = () => {
    deleteNodeById(treeData, selectedNodeId);
    setTreeData([...treeData]);
  };

  const editNodeItem = (newName: string) => {
    editNodeById(treeData, selectedNodeId, newName);
    setTreeData([...treeData]);
    setIsEditNode(false);
  };

  return (
    <TreeContext.Provider
      value={{
        treeData,
        setTreeData,
        selectedNodeId,
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

// import React, { createContext, useState, useContext } from 'react';

// export const TreeProvider = ({ children }) => {
//   const [treeData, setTreeData] = useState<any[]>([]);
//   const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
//   const [newItemType, setNewItemType] = useState<string | null>(null);

//   const setNewItem = (type: string) => {
//     setNewItemType(type);
//   };

//   return (
//     <TreeContext.Provider value={{ treeData, setTreeData, selectedNodeId, setNewItem, newItemType }}>
//       {children}
//     </TreeContext.Provider>
//   );
// };

// export const useTreeContext = () => {
//   const context = useContext(TreeContext);
//   if (!context) {
//     throw new Error('useTreeContext must be used within a TreeProvider');
//   }
//   return context;
// };
