import { useEffect, useRef } from 'react';

import { Flip, toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Message } from 'types';

import styles from './styles.module.scss';

const WsMessage = () => {
  const websocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!websocketRef.current) {
      websocketRef.current = new WebSocket('ws://localhost:3000');
    }

    const websocket = websocketRef.current;
    websocket.onmessage = (e) => {
      const newMessage: Message = JSON.parse(e.data);

      toast.info(newMessage.message, {
        style: {
          color: newMessage.color,
        },
        className: styles.toast,
      });
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (websocketRef.current) {
        setTimeout(() => websocketRef.current && websocketRef.current.close(), 3000);
        websocketRef.current = null;
      }
    };
  }, []);

  return (
    <div className={styles.toastContainer}>
      <ToastContainer
        className={styles.toastContainerBody}
        bodyClassName={styles.toastContainerToast}
        autoClose={6000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Flip}
        limit={2}
      />
    </div>
  );
};

export default WsMessage;
