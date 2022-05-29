import makeWASocket, {
  useSingleFileAuthState,
  DisconnectReason,
  WAMessage,
  WASocket,
  downloadContentFromMessage,
} from '@adiwajshing/baileys';

import { Boom } from '@hapi/boom';
const conn: any[] = [];

const connectToWhatsapp = (session: any) => {
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
      // reconnect if not logged out
      if (shouldReconnect) {
        connectToWhatsapp({
          printQRInTerminal: true,
          auth: state,
        });
      }
    } else if (connection === 'open') {
      console.log('opened connection');
    }
  });

  conn[session].ev.on('messages.upsert', async (msg: any) => {
    console.log(JSON.stringify(msg, undefined, 2));

    console.log('replying to', msg.messages[0].key.remoteJid);
    await conn[session].sendMessage(msg.messages[0].key.remoteJid!, { text: 'Hello there!' });
  });

  conn[session].ev.on('creds.update', saveState);
};

connectToWhatsapp({
  printQRInTerminal: true,
});
