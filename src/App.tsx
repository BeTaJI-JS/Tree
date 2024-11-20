import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import Layout from './layout';
import { router } from './routes';

import './styles/global.scss';
import 'normalize.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
          // v7_normalizeFormMethod: true, // не работает  отключение ворнингов в консоли по роутер дому
          // v7_partialHydration: true,
          // v7_relativeSplatPath: true,
          // v7_skipActionErrorRevalidation: true,
          // v7_fetcherPersist: true,
        }}
      />
    </Layout>
  </StrictMode>,
);
