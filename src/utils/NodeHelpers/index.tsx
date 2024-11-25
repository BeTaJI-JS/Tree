import { nanoid } from 'nanoid';

import { Node } from 'types';

export const getNodeById = (treeData: Node[], nodeId?: string): Node | null => {
  const stack: Node[] = [...treeData];

  while (stack.length) {
    const node = stack.pop();

    if (node && node?.id === nodeId) {
      return node;
    }

    if (node?.children) {
      stack.push(...node.children);
    }
  }

  return null;
};

export const deleteNodeById = (treeData: Node[], nodeId?: string): Node | null => {
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

export const editNodeById = (treeData: Node[], nodeId: string, newName: string): Node | null => {
  const stack = [...treeData];

  while (stack.length) {
    const node = stack.pop();

    if (node && node.id === nodeId) {
      node.name = newName;
      return null;
    }

    if (node?.children) {
      stack.push(...node.children);
    }
  }

  return null;
};

export const getNodeIdsBreadCrumbs = (nodes: Node[], id: string, path: string[] = []): string[] => {
  for (const node of nodes) {
    const newPath = [...path, node.id];
    if (node.id === id) {
      return newPath;
    }
    if (node.children) {
      const result = getNodeIdsBreadCrumbs(node.children, id, newPath);
      if (result.length > 0) {
        return result;
      }
    }
  }
  return [];
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

export const handleAddNewItem = (
  treeData: Node[],
  setTreeData: (data: Node[]) => void,
  selectedNodeId: string | undefined,
  newName: string,
  newItemType: string | null,
  setNewItemType: (type: string | null) => void,
) => {
  if (newName.trim()) {
    const newItem: Node = {
      id: nanoid(),
      name: newName,
      type: newItemType as 'file' | 'folder',
    };

    if (newItemType === 'folder') {
      newItem.children = [];
    }

    const newTreeData = addFolderToNode(treeData, selectedNodeId, newItem);
    setTreeData(selectedNodeId === 'Rootindex' ? [...treeData, newItem] : newTreeData);

    setNewItemType('');
  }
};
