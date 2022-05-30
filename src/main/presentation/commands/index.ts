import { bringMusicFactory, bringVideoFactory, lyricSongFactory } from '@/main/factories';
import { MessageUpdateType, proto, WASocket } from '@adiwajshing/baileys';
import { contracts } from './contracts';
import fs from 'fs/promises';
import { errorResponse, response as botResponse } from '@/main/presentation/helpers';
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

    let permission = ['258858135192@s.whatsapp.net', '120363023889834376@g.us'];
    const mensagem = content?.message?.conversation;

    if (mensagem !== null && mensagem?.charAt(0)) {
      if (mensagem.substring(0, '!mp3'.length).toLowerCase() == '!mp3') {
        const content = mensagem.substring('!mp3'.length).trim();
        const response = await bringMusicFactory.perform({ name: content, user_id: currentUser }, socket, currentUser);
      }
      if (mensagem.substring(0, '!mp4'.length).toLowerCase() == '!mp4') {
        const content = mensagem.substring('!mp4'.length).trim();

        if (permission.includes(currentUser)) {
          return await bringVideoFactory.perform({ name: content, user_id: currentUser }, socket, currentUser);
        } else {
          return await socket.sendMessage(
            currentUser,
            errorResponse(
              'Essa Funcionalidade esta restrita. So pessoas Autorizadas podem acessada\n\n *Peca autorização ao Yazalde Filimone* ',
            ),
          );
        }
      }

      if (mensagem.substring(0, '!letra'.length).toLowerCase() == '!letra') {
        const content = mensagem.substring('!letra'.length).trim();
        console.log(currentUser);
        const response = await lyricSongFactory.perform({ name: content, user_id: currentUser });

        if (response instanceof Error) {
          return await socket.sendMessage(currentUser, { text: botResponse(response.message, false) });
        }
        return await socket.sendMessage(currentUser, { text: botResponse(response.lyric) });
      }

      if (mensagem.substring(0, '!google'.length).toLowerCase() == '!google') {
        // const content = mensagem.substring('!google'.length).trim();
        // console.log(');
        const funcionalidade = await socket.sendMessage(currentUser, { text: botResponse('Esta funcionalidade esta na Fase de teste!!!') });
      }

      if (
        mensagem.substring(0, '!comandos'.length).toLowerCase() == '!comandos' ||
        mensagem.substring(0, '!menu'.length).toLowerCase() == '!menu' ||
        mensagem.substring(0, '!comando'.length).toLowerCase() == '!comando'
      ) {
        await socket.sendMessage(currentUser, { text: contracts.about() });
      }
      if (mensagem.substring(0, '!ideia'.length).toLowerCase() == '!ideia') {
        const userHelp = messages[0].pushName;
        const pathname = resolve(__dirname, 'contracts', 'ideias.text');
        await socket.sendMessage(currentUser, { text: contracts.ideia() });

        const data = await fs.readFile(pathname, { encoding: 'utf-8' });
        const content = mensagem.substring('!ideia'.length).trim();

        const text = `${data}\n\n|----------------Ideia----------------|\n\nname: ${userHelp}
        }{\n${content}\ndata:${new Date().toISOString()}`;

        await fs.writeFile(pathname, text);
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
