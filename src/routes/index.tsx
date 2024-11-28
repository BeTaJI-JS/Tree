import { createBrowserRouter } from 'react-router-dom';

import Content from 'components/Content';

export const router = createBrowserRouter(
  [
    {
      element: <Content />,
      path: '/',
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);
