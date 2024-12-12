import { useEffect } from 'react';

import useSocket from 'hooks/useWebSocket';
import { toast } from 'react-toastify';

import styles from './styles.module.scss';

const WsMessage = () => {
  const { socket } = useSocket('ws://localhost:3000');

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        toast.info(message.message, {
          style: {
            color: message.color,
          },
          className: styles.toast,
        });
      });
    }
  }, [socket]);

  return null;
};

export default WsMessage;
