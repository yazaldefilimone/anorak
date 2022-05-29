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
      if (mensagem.substring(0, 4) == '!mp3') {
        const content = mensagem.substring(4).trim();
        console.log('funcionalidade de download de musica');
        await socket.sendMessage(currentUser, { text: 'funcionalidade de download de musica' });
      }
      if (mensagem.substring(0, 4) == '!mp4') {
        const content = mensagem.substring(4).trim();
        console.log('funcionalidade de download de video');
        await socket.sendMessage(currentUser, { text: 'funcionalidade de download de video' });
      }
      if (mensagem.substring(0, 6) == '!letra') {
        const content = mensagem.substring(6).trim();
        console.log('funcionalidade de pesquisa de letras ');
        await socket.sendMessage(currentUser, { text: 'funcionalidade de pesquisa de letras ' });
      }
      if (mensagem.substring(0, 7) == '!google') {
        const content = mensagem.substring(7).trim();
        console.log('funcionalidade de pesquisa de google');
        await socket.sendMessage(currentUser, { text: 'funcionalidade de pesquisa de google' });
      }
    }
  });
}
