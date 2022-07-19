import makeWASocket, { useSingleFileAuthState, DisconnectReason } from '@adiwajshing/baileys';

import { Boom } from '@hapi/boom';
import { commands } from '@/main/presentation/commands';

const conn: any[] = [];

export const connect = async (session: any) => {
  const { state, saveState } = useSingleFileAuthState('./auth_info_multi.json');
  conn[session] = makeWASocket({
    printQRInTerminal: true,
    auth: state,
  });

  conn[session].ev.on('connection.update', (update: any) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
      if (shouldReconnect) {
        connect({
          printQRInTerminal: true,
          auth: state,
        });
      }
    } else if (connection === 'open') {
      console.log('opened connection');
    }
  });

  commands(conn[session]);

  

  conn[session].ev.on('creds.update', saveState);
};
