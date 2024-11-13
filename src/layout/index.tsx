import { LayoutProps } from 'types/index';

import ControlPanel from 'components/ControlPanel';

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <ControlPanel />
      {children}
    </div>
  );
};

export default Layout;
