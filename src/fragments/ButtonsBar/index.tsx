import Folder from '/folder.svg';
import File from '/file.svg';
import Edit from '/edit.svg';
import Delete from '/delete.svg';

import styles from './styles.module.scss';

import { TreeContext } from 'contexts/TreeContext';

import { useContext } from 'react';

import cn from 'classnames';

const ButtonsBar = () => {
  const { setNewItemType, selectedNode, deleteNodeItem, setIsEditNode } = useContext(TreeContext);
  const isDisabledBtn = selectedNode?.type === 'file';

  const handleAddFolder = () => {
    if (isDisabledBtn) {
      return;
    }
    setNewItemType('folder'); // Устанавливаем тип нового элемента как 'folder'
  };

  const handleAddFile = () => {
    if (isDisabledBtn) {
      return;
    }
    setNewItemType('file'); // Устанавливаем тип нового элемента как 'file'
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

// export default ButtonsBar;

//! изначальный вариант без логики ( не удалять на случай отката и теста)
// import { useContext, useState } from 'react';

// import { TreeContext } from 'contexts/TreeContext';

// import styles from './styles.module.scss';

// const ButtonsBar = () => {
//   const { treeData, setTreeData } = useContext(TreeContext);

//   return (
//     <div className={styles.buttonsBar}>
//       <img src={Folder} alt='folder' />
//       <img src={File} alt='file' />
//       <img src={Edit} alt='edit' />
//       <img src={Delete} alt='delete' />
//     </div>
//   );
// };

// export default ButtonsBar;
