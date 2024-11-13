import { useContext } from 'react';

import { TreeContext } from 'contexts/TreeContext';
import { data } from 'data/index';

import Tree from 'components/Tree';

import styles from './styles.module.scss';
const Content = () => {
  const { treeData } = useContext(TreeContext);
  return (
    <div className={styles.contentContainer}>
      <div className={styles.contentContainerLeft}>
        <Tree data={treeData} />
      </div>
      <div />
    </div>
  );
};

export default Content;
