import { bringMusicFactory, getBibliaUseCase, lyricSongFactory } from '@/main/factories';
import { MessageUpdateType, proto, WASocket } from '@adiwajshing/baileys';
import { contracts } from './contracts';
import fs from 'fs/promises';
import { response as botResponse } from '@/main/presentation/helpers';
import { resolve } from 'path';

export function commands(socket: WASocket) {
  socket.ev.on('messages.upsert', async (userMensagem) => {
    const { type, messages } = userMensagem;
    const content = messages[0];
    const currentUser = content.key?.remoteJid as string;
    // if (content.key.fromMe) {
    //   // return true;
    // }

    const mensagem = content?.message?.conversation;

    if (mensagem !== null && mensagem?.charAt(0)) {
      const substring = (payload: string) => mensagem.substring(0, payload.length);

      // if (substring('!mp3').toLowerCase() == '!mp3') {
      //   const content = mensagem.substring('!mp3'.length).trim();
      //   const response = await bringMusicFactory.perform({ name: content, user_id: currentUser }, socket, currentUser);
      // }

      if (substring('!letra').toLowerCase() == '!letra') {
        try {
          const content = mensagem.substring('!letra'.length).trim();
          const response = await lyricSongFactory.perform({ name: content, user_id: currentUser });
          if (response instanceof Error) {
            return await socket.sendMessage(currentUser, { text: response.message });
          }

          return await socket.sendMessage(currentUser, { text: response.lyric });
        } catch (eerr) {
          await socket.sendMessage(currentUser, { text: botResponse('Ouve um Erro interno, Volte a tentar numa outra hora...', false) });
        }
      }

      if (substring('!google').toLowerCase() == '!google') {
        // const content = mensagem.substring('!google').trim();
        // console.log(');
        const funcionalidade = await socket.sendMessage(currentUser, { text: botResponse('Esta funcionalidade esta na Fase de teste!!!') });
      }

      if (
        substring('!comandos').toLowerCase() == '!comandos' ||
        substring('!menu').toLowerCase() == '!menu' ||
        substring('!comando').toLowerCase() == '!comando'
      ) {
        try {
          await socket.sendMessage(currentUser, { text: contracts.about() });
        } catch (eerr) {
          await socket.sendMessage(currentUser, { text: botResponse('Ouve um Erro interno, Volte a tentar numa outra hora...', false) });
        }
      }

      if (substring('!biblia').toLowerCase() == '!biblia' || substring('!biblia').toLowerCase() == '!bíblia') {
        const content = mensagem.substring('!biblia'.length).trim();
        const [book, chapter, lang] = content.split(' ');
        console.log({ content });
        try {
          const response = await getBibliaUseCase.perform({ book, chapter, lang });
          if (response instanceof Error) {
            return await socket.sendMessage(currentUser, { text: response.message });
          }

          await socket.sendMessage(currentUser, { text: response.text });
        } catch (error: any) {
          return await socket.sendMessage(currentUser, { text: botResponse(error.message, false) });
        }
      }

      if (
        substring('!sobre').toLowerCase() == '!sobre' ||
        substring('!anorak').toLowerCase() == '!anorak' ||
        substring('!criador').toLowerCase() == '!criador' ||
        substring('!dono').toLowerCase() == '!dono'
      ) {
        try {
          await socket.sendMessage(currentUser, { text: contracts.owner() });
        } catch (error) {
          await socket.sendMessage(currentUser, { text: botResponse('Ouve um Erro interno, Volte a tentar numa outra hora...', false) });
        }
      }

      if (
        mensagem.substring(0, '!ideia'.length).toLowerCase() == '!ideia' ||
        mensagem.substring(0, '!help'.length).toLowerCase() == '!help'
      ) {
        try {
          const userHelp = messages[0].pushName;
          const pathname = resolve(__dirname, 'contracts', 'ideias.text');

          const data = await fs.readFile(pathname, { encoding: 'utf-8' });
          const content = mensagem?.substring('!ideia'.length).trim();

          const text = `${data}\n\n|----Ideia----|\nNome: ${userHelp}\nMensagem: ${content}\nTimestamp:${new Date().toISOString()}`;
          await socket.sendMessage(currentUser, { text: contracts.help(userHelp ? userHelp : 'Anónimo') });
          await fs.writeFile(pathname, text);
          return;
        } catch (error) {
          await socket.sendMessage(currentUser, { text: botResponse('Ouve um Erro interno, Volte a tentar numa outra hora...', false) });
        }
      }
    }
  });
}
