import { useEffect, useMemo, useState } from 'react';

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
      setMessage(JSON.parse(e.data));
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }, [websocket]);

  if (!message) {
    return null;
  }

  return <span style={{ color: message.color }}>{message.message}</span>;
};

export default WsMessage;
