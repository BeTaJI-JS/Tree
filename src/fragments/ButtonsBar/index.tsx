import cn from 'classnames';

import Folder from '/folder.svg';
import File from '/file.svg';
import Edit from '/edit.svg';
import Delete from '/delete.svg';

import { useContext } from 'react';

import styles from './styles.module.scss';

import { TreeContext } from 'contexts/TreeContext';

import { TreeContextType } from 'types';

const ButtonsBar = () => {
  const { setNewItemType, selectedNode, deleteNodeItem, setIsEditNode } = useContext(TreeContext) as TreeContextType;

  const isDisabledBtn = selectedNode?.type === 'file';

  const handleAddFolder = () => {
    if (isDisabledBtn) {
      return;
    }
    setNewItemType('folder');
  };

  const handleAddFile = () => {
    if (isDisabledBtn) {
      return;
    }
    setNewItemType('file');
  };

  const handleDeleteNode = () => {
    if (selectedNode) {
      deleteNodeItem();
    }
  };

  const handleEditNode = () => {
    if (!selectedNode) {
      return;
    }
    setIsEditNode((prev) => !prev);
  };

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
