import { create, Whatsapp } from 'venom-bot';
import { Chat } from '../Chat';

create({ session: 'session-name', multidevice: false })
  .then((client: Whatsapp) => start(client))
  .catch((err) => {
    console.log(err);
  });
const start = (client: Whatsapp) => {
  client.onMessage((userContent) => Chat(userContent, client));
};
