import { LayoutProps } from 'types/index';

import styles from './styles.module.scss';

const Layout = ({ children }: LayoutProps) => <div className={styles.layoutContainer}>{children}</div>;

export default Layout;
