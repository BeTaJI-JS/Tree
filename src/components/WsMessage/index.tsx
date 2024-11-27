import { useEffect } from 'react';

import { Flip, toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.scss';

type Message = {
  message: string;
  time: number;
  color: string;
};

const WsMessage = () => {
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:3000');
    websocket.onmessage = (e) => {
      const newMessage: Message = JSON.parse(e.data);
      console.log(newMessage);

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
      setTimeout(() => websocket.close(), 3000);
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
