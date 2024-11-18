import ControlPanel from 'components/ControlPanel';

import { LayoutProps } from 'types/index';

import styles from './styles.module.scss';
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layoutContainer}>
      <ControlPanel />
      {children}
    </div>
  );
};

export default Layout;
