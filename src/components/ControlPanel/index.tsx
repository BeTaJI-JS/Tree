import { useContext } from 'react';

import { TreeContext } from 'contexts/TreeContext';

import NotifyContainer from 'components/NotifyContainer';

import BreadCrumbs from 'fragments/BreadCrumbs';
import ButtonsBar from 'fragments/ButtonsBar';

import { TreeContextType } from 'types';

import styles from './styles.module.scss';

const ControlPanel = () => {
  const { treeData, selectedNode } = useContext(TreeContext) as TreeContextType;

  return (
    <div className={styles.controlPanel}>
      <NotifyContainer />
      <BreadCrumbs currentId={selectedNode?.id} treeData={treeData} />
      <ButtonsBar />
    </div>
  );
};

export default ControlPanel;
