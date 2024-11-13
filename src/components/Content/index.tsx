import { data } from 'data/index';

import Tree from 'components/Tree';

import styles from './styles.module.scss';
const Content = () => {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.contentContainerLeft}>
        <Tree data={data} />
      </div>
      <div />
    </div>
  );
};

export default Content;
