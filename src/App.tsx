import { StrictMode } from 'react';

import { TreeProvider } from 'contexts/TreeContext';
import { createRoot } from 'react-dom/client';

import Content from 'components/Content';

import Layout from './layout';

import './styles/global.scss';
import 'normalize.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TreeProvider>
      <Layout>
        <Content />
      </Layout>
    </TreeProvider>
  </StrictMode>,
);
