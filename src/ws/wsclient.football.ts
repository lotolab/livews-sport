import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { useSocket } from './useSocket';
import type { Pinia } from 'pinia';
import { useGameFBStore } from '@/store';
import type { FBGameLiveBase, FBGameLiveStatistics } from '@/core/types';

let _fbcli: Socket | null = null;

const gameid = import.meta.env.VITE_WS_GAMEID;
const fbSocket = {
  connectFootballSocket: (store: Pinia, topic?: string) => {
    const { wsurl } = useSocket();
    let url = wsurl;
    if (topic?.length && /^[a-zA-Z0-9]+/.test(topic)) {
      url = url.endsWith(topic) ? url : `${url}/${topic}`;
    }

    if (gameid?.length) {
      url =
        url.indexOf('?') === -1
          ? `${url}?gameid=${gameid}`
          : `${url}&gameid=${gameid}`;
      // url = `http://${window.location.host}/socket.io`;
    }

    if (!_fbcli) {
      _fbcli = io(url, {
        // path: 'fb',
        timeout: 30000,
        retries: 10,
        ackTimeout: 30000,
        autoConnect: true,
        transports: ['websocket', 'polling'],
        withCredentials: true,
        forceNew: true
      });

      globalThis.console.log(url, _fbcli);

      _fbcli.on('connect', () => {
        globalThis.console.log(`${_fbcli?.id} connected....`);
      });

      _fbcli.on('connect_error', (err) => {
        globalThis.console.error('Connect error>>>', err);
      });

      registListeners(store, _fbcli);
    }

    return _fbcli;
  },

  sendMessage: <M = any>(message: M) => {
    if (!_fbcli) {
      throw new Error(`Please init client first`);
    }

    _fbcli.emit('send', message);
  }
};

function registListeners(store: Pinia, cli: Socket) {
  const gameStore = useGameFBStore(store);
  // const errStore = useErrlog(store);

  /**
   *
   */
  cli.on('GameLiveBase', async (liveBase: FBGameLiveBase) => {
    globalThis.console.log(`liveBase: `, typeof liveBase, liveBase);
    if (liveBase) {
      await gameStore.updateLiveBase(JSON.parse(JSON.stringify(liveBase)));
    }
  });

  /**
   *
   */
  cli.on('GameLiveStatistics', async (liveStat: FBGameLiveStatistics) => {
    globalThis.console.log(`GameLiveStatistics: `, liveStat);
    if (liveStat) {
      await gameStore.updateLiveStat(liveStat);
    }
  });
}

export default fbSocket;
