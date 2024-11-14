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
};

export type TreeNodeProps = {
  node: Node;
  onSelect: (node: Node) => void;
  selectedNodeId?: string;
};

export type CustomTreeNodeProps = {
  node: Node;
  onSelect: (node: Node) => void;
  selectedNodeId?: string;
  isOpen: boolean;
  toggleOpen: (e: React.MouseEvent) => void;
};
