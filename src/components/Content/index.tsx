import { TreeProvider } from 'contexts/TreeContext';

import ControlPanel from 'components/ControlPanel';
import Tree from 'components/Tree';
import WsMessage from 'components/WsMessage';

import styles from './styles.module.scss';
const Content = () => {
  return (
    <TreeProvider>
      <ControlPanel />
      <div className={styles.contentContainer}>
        <div className={styles.contentContainerLeft}>
          <Tree />
        </div>
        <div className={styles.contentContainerRight}>
          <WsMessage />
        </div>
      </div>
    </TreeProvider>
  );
};

export default Content;
