import { MessageUpdateType, proto, WASocket } from '@adiwajshing/baileys';
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
      if (mensagem.substring(0, '!mp3'.length) == '!mp3') {
        const content = mensagem.substring('!mp3'.length).trim();
        console.log('funcionalidade de download de musica');
        await socket.sendMessage(currentUser, { text: 'funcionalidade de download de musica' });
      }

      if (mensagem.substring(0, '!mp4'.length) == '!mp4') {
        const content = mensagem.substring('!mp4'.length).trim();
        console.log('funcionalidade de download de video');
        await socket.sendMessage(currentUser, { text: 'funcionalidade de download de video' });
      }

      if (mensagem.substring(0, '!letra'.length) == '!letra') {
        const content = mensagem.substring('!letra'.length).trim();
        console.log('funcionalidade de pesquisa de letras ');
        await socket.sendMessage(currentUser, { text: 'funcionalidade de pesquisa de letras ' });
      }

      if (mensagem.substring(0, '!google'.length) == '!google') {
        const content = mensagem.substring('!google'.length).trim();
        console.log('funcionalidade de pesquisa de google');
        await socket.sendMessage(currentUser, { text: 'funcionalidade de pesquisa de google' });
      }

      if (
        mensagem.substring(0, '!comandos'.length) == '!comandos' ||
        mensagem.substring(0, '!menu'.length) == '!menu' ||
        mensagem.substring(0, '!comando'.length) == '!comando'
      ) {
        await socket.sendMessage(currentUser, { text: '' });
      }
    }
  });
}
