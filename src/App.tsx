import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Message } from 'types';

import Layout from './layout';
import { router } from './routes';

import './styles/global.scss';
import 'normalize.css';
import 'react-toastify/dist/ReactToastify.css';

const websocket = new WebSocket('ws://localhost:3000');
websocket.onmessage = (e) => {
  const newMessage: Message = JSON.parse(e.data);
  console.log(newMessage);

  toast.info(newMessage.message, {
    style: {
      color: newMessage.color,
    },
    className: 'toast',
  });
};

websocket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

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
