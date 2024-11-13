import BreadCrumbs from 'fragments/BreadCrumbs';
import ButtonsBar from 'fragments/ButtonsBar';

import styles from './styles.module.scss';

const ControlPanel = () => {
  return (
    <div className={styles.controlPanel}>
      <BreadCrumbs />
      <ButtonsBar />
    </div>
  );
};

export default ControlPanel;
