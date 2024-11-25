import { useEffect, useMemo, useState } from 'react';

import { Flip, toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

import styles from './styles.module.scss';

type Message = {
  message: string;
  time: number;
  color: string;
};

const WsMessage = () => {
  const websocket = useMemo(() => new WebSocket('ws://localhost:3000'), []);
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    websocket.onmessage = (e) => {
      const newMessage = JSON.parse(e.data);
      setMessage(newMessage);
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }, [websocket]);

  useEffect(() => {
    if (message) {
      toast.info(message.message, {
        transition: Flip,
        style: {
          color: message.color,
        },
        className: styles.toast,
      });
    }
  }, [message]);

  if (!message) {
    return null;
  }

  return (
    <div className={styles.toastContainer}>
      <ToastContainer
        className={styles.toastContainerBody}
        bodyClassName={styles.toastContainerToast}
        autoClose={78000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Flip}
        limit={2}
        stacked
      />
    </div>
  );
};

export default WsMessage;
