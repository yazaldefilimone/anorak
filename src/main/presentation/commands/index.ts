import { lyricSongFactory } from '@/main/factories';
import { MessageUpdateType, proto, WASocket } from '@adiwajshing/baileys';
import { contracts } from './contracts';
import { botResponse } from '@/main/presentation/helpers';
import { resolve } from 'path';
export function commands(socket: WASocket) {
  const mp3Path = resolve(__dirname, '..', '..', '..', '..', 'cache', 'mp3');
  const mp4Path = resolve(__dirname, '..', '..', '..', '..', 'cache', 'mp4');
  socket.ev.on('messages.upsert', async (userMensagem) => {
    const { type, messages } = userMensagem;
    const content = messages[0];
    const currentUser = content.key?.remoteJid as string;
    if (content.key.fromMe) {
      return true;
    }

    const mensagem = content?.message?.conversation;

    if (mensagem !== null && mensagem?.charAt(0)) {
      if (mensagem.substring(0, '!mp3'.length).toLowerCase() == '!mp3') {
        const content = mensagem.substring('!mp3'.length).trim();

        await socket.sendMessage(currentUser, { text: 'funcionalidade de download de musica' });
      }
      if (mensagem.substring(0, '!mp4'.length).toLowerCase() == '!mp4') {
        const content = mensagem.substring('!mp4'.length).trim();
        console.log('funcionalidade de download de video');
        await socket.sendMessage(currentUser, { text: 'funcionalidade de download de video' });
      }

      if (mensagem.substring(0, '!letra'.length).toLowerCase() == '!letra') {
        const content = mensagem.substring('!letra'.length).trim();
        const response = await lyricSongFactory.perform({ name: content, user_id: currentUser });

        if (response instanceof Error) {
          return await socket.sendMessage(currentUser, { text: botResponse(response.message, false) });
        }
        return await socket.sendMessage(currentUser, { text: botResponse(response.lyric) });
      }

      if (mensagem.substring(0, '!google'.length).toLowerCase() == '!google') {
        // send a buttons message with image header!
        const buttons = [
          { buttonId: 'id1', buttonText: { displayText: 'Button 1' }, type: 1 },
          { buttonId: 'id2', buttonText: { displayText: 'Button 2' }, type: 1 },
          { buttonId: 'id3', buttonText: { displayText: 'Button 3' }, type: 1 },
        ];

        const buttonMessage = {
          image: { url: 'https://images.genius.com/6e6fd493bab31e3e31489ac141adfebf.300x300x1.jpg' },
          caption: "Hi it's button message",
          footer: 'Hello World',
          buttons: buttons,
          headerType: 4,
        };

        // const sendMsg = await sock.sendMessage(id, buttonMessage);

        // const content = mensagem.substring('!google'.length).trim();
        // console.log('funcionalidade de pesquisa de google');
        const funcionalidade = await socket.sendMessage(currentUser, buttonMessage);
        console.log({ funcionalidade });
      }

      if (
        mensagem.substring(0, '!comandos'.length).toLowerCase() == '!comandos' ||
        mensagem.substring(0, '!menu'.length).toLowerCase() == '!menu' ||
        mensagem.substring(0, '!comando'.length).toLowerCase() == '!comando'
      ) {
        await socket.sendMessage(currentUser, { text: contracts.about() });
      }

      if (
        mensagem.substring(0, '!sobre'.length).toLowerCase() == '!sobre' ||
        mensagem.substring(0, '!anorak'.length).toLowerCase() == '!anorak' ||
        mensagem.substring(0, '!criador'.length).toLowerCase() == '!criador' ||
        mensagem.substring(0, '!dono'.length).toLowerCase() == '!dono'
      ) {
        await socket.sendMessage(currentUser, { text: contracts.owner() });
      }
    }
  });
}
