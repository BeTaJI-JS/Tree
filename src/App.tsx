import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import Content from 'components/Content';

import Layout from './layout';

import './styles/global.scss';
import 'normalize.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <Content />
    </Layout>
  </StrictMode>,
);
