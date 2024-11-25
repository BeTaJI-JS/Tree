import { useCallback, useContext, useMemo } from 'react';

import cn from 'classnames';

import Folder from '/folder.svg';
import File from '/file.svg';
import Edit from '/edit.svg';
import Delete from '/delete.svg';

import { TreeContext } from 'contexts/TreeContext';

import styles from './styles.module.scss';

import { TreeContextType } from 'types';

const ButtonsBar = () => {
  const { setNewItemType, selectedNode, deleteNodeItem, setIsEditNode } = useContext(TreeContext) as TreeContextType;

  const isDisabledBtn = useMemo(() => selectedNode?.type === 'file', [selectedNode]);

  const handleAddFolder = useCallback(() => {
    if (isDisabledBtn) {
      return;
    }
    setNewItemType('folder');
  }, [setNewItemType, isDisabledBtn]);

  const handleAddFile = useCallback(() => {
    if (isDisabledBtn) {
      return;
    }
    setNewItemType('file');
  }, [setNewItemType, isDisabledBtn]);

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
      <img src={Folder} alt='folder' onClick={handleAddFolder} className={cn({ [styles.disableBtn]: isDisabledBtn })} />
      <img src={File} alt='file' onClick={handleAddFile} className={cn({ [styles.disableBtn]: isDisabledBtn })} />
      <img src={Edit} alt='edit' onClick={handleEditNode} />
      <img src={Delete} alt='delete' onClick={handleDeleteNode} />
    </div>
  );
};

export default ButtonsBar;
