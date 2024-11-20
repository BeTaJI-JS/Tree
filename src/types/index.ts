export type Node = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: Array<Node>;
};

export type LayoutProps = {
  children: React.ReactNode;
};

export type TreeProps = {
  data: Node[];
  nodeId?: string;
};

export type TreeNodeProps = {
  node: Node;
  onSelect?: (node: Node) => void; // к удалению думаю
  selectedNodeId?: string;
};

export type CustomTreeNodeProps = {
  node: Node;
  onSelect: (node: Node) => void;
  selectedNodeId?: string;
  isOpen: boolean;
  toggleOpen: (e: React.MouseEvent) => void;
};

export type TreeContextType = {
  treeData: Node[];
  setTreeData: (data: Node[]) => void;
  newItemType: string | null;
  setNewItemType: (type: string) => void;
  selectedNode?: Node | null; // к удалению
  deleteNodeItem: () => void;
  editNodeItem: (newName: string) => void;
  isEditNode: boolean;
  setIsEditNode: (value: boolean | ((prevIsEditNode: boolean) => boolean)) => void;
};
