import { useEffect, useRef, useState } from 'react';

import { Message } from 'types';

const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const wsConnection = socketRef.current;

    const connectWebSocket = () => {
      if (!wsConnection) {
        return;
      }
      socketRef.current = new WebSocket(url);

      wsConnection.onopen = () => {
        setIsConnected(true);
        setError(null);
      };

      wsConnection.onmessage = (event) => {
        try {
          const newMessage: Message = JSON.parse(event.data);
          setMessages((prevMessages) => {
            // Сравниваем предыдущие сообщения с новыми
            if (
              prevMessages.length === 0 ||
              JSON.stringify(prevMessages[prevMessages.length - 1]) !== JSON.stringify(newMessage)
            ) {
              return [...prevMessages, newMessage];
            }
            return prevMessages;
          });
        } catch (err) {
          console.error('Error parsing message:', err);
        }
      };

      wsConnection.onerror = (event) => {
        if (event instanceof Error) {
          setError(event.message);
        } else {
          setError('Неизвестная ошибка');
        }
      };

      wsConnection.onclose = () => {
        setIsConnected(false);
        // Пробуем переподключиться через 2 секунды
        setTimeout(connectWebSocket, 2000);
      };
    };

    connectWebSocket();

    return () => {
      if (wsConnection) {
        wsConnection.close();
      }
    };
  }, [url]);

  return { messages, error, isConnected };
};

export default useWebSocket;
