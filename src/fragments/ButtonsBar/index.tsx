import Folder from '/folder.svg';
import File from '/file.svg';
import Edit from '/edit.svg';
import Delete from '/delete.svg';

import styles from './styles.module.scss';

const ButtonsBar = () => {
  return (
    <div className={styles.buttonsBar}>
      <img src={Folder} alt='folder' />
      <img src={File} alt='file' />
      <img src={Edit} alt='edit' />
      <img src={Delete} alt='delete' />
    </div>
  );
};

export default ButtonsBar;
