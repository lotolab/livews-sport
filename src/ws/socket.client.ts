import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { useSocket } from './useSocket';

let _client: Socket | null = null;

export const connectSocket = (topic?: string) => {
  const { wsurl } = useSocket();
  let url = wsurl;
  if (topic?.length && /^[a-zA-Z0-9]+/.test(topic)) {
    url = url.endsWith(topic) ? url : `${url}/${topic}`;
  }

  if (!_client) {
    _client = io(url, {
      timeout: 30000,
      retries: 10,
      ackTimeout: 30000,
      autoConnect: true,
      transports: ['websocket', 'polling']
    });

    _client.on('connect', () => {
      globalThis.console.log(`${_client?.id} connected....`);
    });
  }

  return _client;
};
