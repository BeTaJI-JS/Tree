import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import Layout from './layout';
import { router } from './routes';

import './styles/global.scss';
import 'normalize.css';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </Layout>
  </StrictMode>,
);
