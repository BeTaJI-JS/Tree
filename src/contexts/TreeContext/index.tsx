import React, { useState } from 'react';

import { data } from 'data/index';

const TreeContext = React.createContext({});

// типизация children - ReactNode, потому что children - это
// реакт-элемент, который может быть как одиночным, так и массивом
const TreeProvider = ({ children }: { children: React.ReactNode }) => {
  const [treeData, setTreeData] = useState(data);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');

  return (
    <TreeContext.Provider value={{ treeData, setTreeData, selectedNodeId, setSelectedNodeId }}>
      {children}
    </TreeContext.Provider>
  );
};

export { TreeProvider, TreeContext };
