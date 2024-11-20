import { createBrowserRouter } from 'react-router-dom';

import Content from 'components/Content';

export const router = createBrowserRouter([
  {
    element: <Content />,
    path: '/',
  },
]);
