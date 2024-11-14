import React, { useMemo, useState } from 'react';

import { data } from 'data/index';

const TreeContext = React.createContext({});

const getNodeById = (treeData, nodeId) => {
  for (const node of treeData) {
    if (node.id === nodeId) {
      return node;
    }
    if (node.children) {
      const res = getNodeById(node.children, nodeId);
      if (res) {
        return res;
      }
    }
  }

  return null;
};

const deleteNodeById = (treeData, nodeId) => {
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];
    if (node.id === nodeId) {
      treeData.splice(i, 1);
      return null;
    }
    if (node.children) {
      const res = deleteNodeById(node.children, nodeId);
      if (res) {
        return res;
      }
    }
  }

  return null;
};

const editNodeById = (treeData, nodeId, newName) => {
  console.log('nodeId', nodeId);

  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];
    if (node.id === nodeId) {
      node.name = newName;
      return null;
    }
    if (node.children) {
      const res = editNodeById(node.children, nodeId, newName);
      console.log('res', res);

      if (res) {
        return res;
      }
    }
  }

  return null;
};

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
        editNodeById,
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
