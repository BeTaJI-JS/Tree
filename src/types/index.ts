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
  onSelect?: (node: Node) => void;
  selectedNodeId?: string;
  defaultExpandedNodesIds: Record<string, boolean>;
};

export type CustomTreeNodeProps = {
  isOpen: boolean;
  toggleOpen: (e: React.MouseEvent) => void;
} & TreeNodeProps;

export type TreeContextType = {
  treeData: Node[];
  setTreeData: (data: Node[]) => void;
  newItemType: string | null;
  setNewItemType: (type: string | null) => void;
  selectedNode?: Node | null;
  deleteNodeItem: () => void;
  editNodeItem: (newName: string) => void;
  isEditNode: boolean;
  setIsEditNode: (value: boolean | ((prevIsEditNode: boolean) => boolean)) => void;
};

export type Message = {
  message: string;
  time: number;
  color: string;
};
