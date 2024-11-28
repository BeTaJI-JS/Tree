import { TreeProvider } from 'contexts/TreeContext';

import ControlPanel from 'components/ControlPanel';
import Tree from 'components/Tree';
import WsMessage from 'components/WsMessage';

import styles from './styles.module.scss';

const Content = () => (
  <TreeProvider>
    <WsMessage />
    <ControlPanel />
    <div className={styles.contentContainer}>
      <div className={styles.contentContainerLeft}>
        <Tree />
      </div>
      <div />
    </div>
  </TreeProvider>
);

export default Content;
