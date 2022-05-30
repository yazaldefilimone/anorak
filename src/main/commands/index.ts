import { MessageUpdateType, proto, WASocket } from '@adiwajshing/baileys';
import { contracts } from './contracts';
type CommandProps = {
  messages: proto.IWebMessageInfo[];
  type: MessageUpdateType;
};
export function commands(socket: WASocket) {
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
        console.log('funcionalidade de download de musica');
        await socket.sendMessage(currentUser, { text: 'funcionalidade de download de musica' });
      }
      if (mensagem.substring(0, '!mp4'.length).toLowerCase() == '!mp4') {
        const content = mensagem.substring('!mp4'.length).trim();
        console.log('funcionalidade de download de video');
        await socket.sendMessage(currentUser, { text: 'funcionalidade de download de video' });
      }

      if (mensagem.substring(0, '!letra'.length).toLowerCase() == '!letra') {
        const content = mensagem.substring('!letra'.length).trim();
        console.log('funcionalidade de pesquisa de letras ');
        await socket.sendMessage(currentUser, { text: 'funcionalidade de pesquisa de letras ' });
      }

      if (mensagem.substring(0, '!google'.length).toLowerCase() == '!google') {
        const content = mensagem.substring('!google'.length).trim();
        console.log('funcionalidade de pesquisa de google');
        await socket.sendMessage(currentUser, { text: 'funcionalidade de pesquisa de google' });
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
