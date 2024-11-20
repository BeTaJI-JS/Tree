import { Node } from 'types/index';

export const getNodeById = (treeData: Node[], nodeId?: string): Node | null => {
  for (const node of treeData) {
    if (node.id === nodeId) {
      return node;
    }
    if (node.children) {
      const res: Node | null = getNodeById(node.children, nodeId);
      if (res) {
        return res;
      }
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
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];
    if (node.id === nodeId) {
      node.name = newName;
      return null;
    }
    if (node.children) {
      const res = editNodeById(node.children, nodeId, newName);

      if (res) {
        return res;
      }
    }
  }

  return null;
};
