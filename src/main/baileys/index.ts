import { connect } from '@/main/settings';

export default async function () {
  const client = await connect();
  client.ev.on('messages.upsert', async (messages) => {
    console.log(JSON.stringify(messages, undefined, 2));

    console.log('replying to', messages.messages[0].key.remoteJid);
    await client.sendMessage(messages.messages[0].key.remoteJid!, { text: 'Hello there!' });
  });
}
