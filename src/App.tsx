import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import TestComponent from 'components/TestComponent';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>шаблон проекта</div>
    <TestComponent />
  </StrictMode>,
);
