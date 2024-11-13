import Folder from '/folder.svg';
import File from '/file.svg';
import Edit from '/edit.svg';
import Delete from '/delete.svg';

import styles from './styles.module.scss';

import { TreeContext } from 'contexts/TreeContext';

import { useContext, useRef, useState } from 'react';

import { setUniqId } from 'utils/index';

const ButtonsBar = () => {
  const { treeData, setTreeData, selectedNodeId } = useContext(TreeContext);
  const [editingNodeId, setEditingNodeId] = useState(null); // Для отслеживания редактируемого узла
  // const inputRef = useRef(null);
  // console.log('inputRef', inputRef);

  const addFolder = () => {
    const newFolder = {
      id: setUniqId(),
      name: 'Новая папка',
      type: 'folder',
      children: [],
    };

    const newTreeData = treeData.map((node) => addFolderToNode(node, selectedNodeId, newFolder));
    setTreeData(newTreeData);

    setEditingNodeId(newFolder.id);
    // if (inputRef.current) {
    // inputRef.current = newFolder;
  };

  const addFolderToNode = (node, selectedId, newFolder) => {
    if (node.id === selectedId) {
      return {
        ...node,
        children: [...(node.children || []), newFolder],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: node.children.map((child) => addFolderToNode(child, selectedId, newFolder)),
      };
    }
    return node;
  };

  // const handleNameChange = (e) => {
  //   const newName = e.target.value;
  //   const newTreeData = treeData.map((node) => editNodeById(node, editingNodeId, newName));
  //   setTreeData(newTreeData);
  // };

  // const editNodeById = (node, selectedId, newName) => {
  //   if (node.id === selectedId) {
  //     return {
  //       ...node,
  //       name: newName,
  //     };
  //   }
  //   if (node.children) {
  //     return {
  //       ...node,
  //       children: node.children.map((child) => editNodeById(child, selectedId, newName)),
  //     };
  //   }
  //   return node;
  // };

  return (
    <div className={styles.buttonsBar}>
      {/* <input ref={inputRef} type='text' placeholder='Введите имя папки' onChange={handleNameChange} /> */}
      <img src={Folder} alt='folder' onClick={addFolder} />
      <img src={File} alt='file' />
      <img src={Edit} alt='edit' />
      <img src={Delete} alt='delete' />
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
