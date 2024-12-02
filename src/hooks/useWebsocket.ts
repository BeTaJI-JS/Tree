import { useCallback, useEffect, useRef, useState } from 'react';

import { Message } from 'types';

const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  console.log('socketRef', socketRef);

  const connect = useCallback(() => {
    if (socketRef.current) {
      // Если сокет уже существует, не создаем новый
      return;
    }

    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    socketRef.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prevMessages) => {
        // Сравниваем предыдущие сообщения с новыми
        if (JSON.stringify(prevMessages[prevMessages.length - 1]) !== JSON.stringify(newMessage)) {
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });
    };

    socketRef.current.onerror = (event) => {
      console.log('event', event);

      if (event instanceof Error) {
        setError(event.message);
      } else {
        setError(null);
      }
    };
    socketRef.current.onclose = () => {
      setIsConnected(false);
      // Попробуем переподключиться через 2 секунды
      setTimeout(() => {
        connect();
      }, 2000);
    };
  }, [url]);

  useEffect(() => {
    connect();

    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, [connect]);

  return { messages, error, isConnected };
};

export default useWebSocket;
