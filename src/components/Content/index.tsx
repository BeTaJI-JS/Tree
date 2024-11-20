import { TreeProvider } from 'contexts/TreeContext';

import ControlPanel from 'components/ControlPanel';
import Tree from 'components/Tree';

import styles from './styles.module.scss';
const Content = () => {
  return (
    <TreeProvider>
      <ControlPanel />
      <div className={styles.contentContainer}>
        <div className={styles.contentContainerLeft}>
          <Tree />
        </div>
        <div />
      </div>
    </TreeProvider>
  );
};

export default Content;
