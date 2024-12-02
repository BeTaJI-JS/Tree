import { useEffect } from 'react';

import useWebSocket from 'hooks/useWebsocket';
import { toast } from 'react-toastify';

import { Message } from 'types';

import styles from './styles.module.scss';

const WsMessage = () => {
  const { messages, error } = useWebSocket('ws://localhost:3000');

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage: Message = messages[messages.length - 1];
      toast.info(lastMessage.message, {
        style: {
          color: lastMessage.color,
        },
        className: styles.toast,
      });
    }

    if (error) {
      console.error('WebSocket error:', error);
    }
  }, [messages, error]);

  return null;
};

export default WsMessage;
