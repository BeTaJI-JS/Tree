import { useEffect, useRef, useState } from 'react';

import { io, Socket, SocketOptions } from 'socket.io-client';

const useSocket = (url: string, options?: Partial<SocketOptions>) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const isInitialized = useRef<boolean | null>(null);

  useEffect(() => {
    if (!isInitialized.current) {
      const newSocket = io(url, {
        autoConnect: true,
        ...options,
      });

      setSocket(newSocket);
      isInitialized.current = true;

      return () => {
        newSocket.disconnect();
        isInitialized.current = null;
      };
    }
  }, [url, options]);

  return { socket };
};

export default useSocket;
