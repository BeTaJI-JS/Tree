import { useCallback, useContext } from 'react';

import Folder from '/folder.svg';
import File from '/file.svg';
import Edit from '/edit.svg';
import Delete from '/delete.svg';

import { TreeContext } from 'contexts/TreeContext';

import { TreeContextType } from 'types';

import styles from './styles.module.scss';

const ButtonsBar = () => {
  const { setNewItemType, selectedNode, deleteNodeItem, setIsEditNode } = useContext(TreeContext) as TreeContextType;

  const handleAddFolder = useCallback(() => {
    setNewItemType('folder');
  }, [setNewItemType]);

  const handleAddFile = useCallback(() => {
    setNewItemType('file');
  }, [setNewItemType]);

  const handleDeleteNode = useCallback(() => {
    if (selectedNode) {
      deleteNodeItem();
    }
  }, [deleteNodeItem, selectedNode]);

  const handleEditNode = useCallback(() => {
    if (!selectedNode) {
      return;
    }
    setIsEditNode((prev) => !prev);
  }, [setIsEditNode, selectedNode]);

  return (
    <div className={styles.buttonsBar}>
      <img src={Folder} alt='folder' onClick={handleAddFolder} />
      <img src={File} alt='file' onClick={handleAddFile} />
      <img src={Edit} alt='edit' onClick={handleEditNode} />
      <img src={Delete} alt='delete' onClick={handleDeleteNode} />
    </div>
  );
};

export default ButtonsBar;
