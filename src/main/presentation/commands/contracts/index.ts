import { Letter } from '@/shared/letter';

export const contracts = {
  about: () => {
    return `
    ┏ 🤖  * Anorak - Bot * 🤖
  ┯┷ ☾ Study Commands ☽
  ╽
  ┠❥ *!biblia [mateus 12:2] - (Retorna a palavra que esta na bíblia)*
  ╿
  ┯┷ ☾ Downloader Commandos ☽
  ╽
  ┠❥ *!mp3 [nome do artista/musica] - (faz o download da musica)*
  ┠❥ *!letra [nome do artista/musica] - (faz uma busca da letra da musica)*
  ┠❥ *!facebook [link do video facebook]*
  ╿
  ┷┯ ☾ Outros Commandos ☽
  ╽
  ┠❥ *!sobre mim*
  ┠❥ *!sobre*
  ╰╼❥ Envie o comando *!sobre* para saber mais sobre!!.
    `;
  },

  owner: () => {
    return `${Letter.monoSpace(`Hi There!!\nEu sou  Yazalde Filimone  tenho 17 anos e sou  Apenas um garoto introvertido que gosta de animes e cosplay\n\nSoftware Engineer na A4PM - Analytics for Public Management. \n\nSou entusiasta da computação académica e sempre em constante aprendizado\n\nMeu Site: https://yazaldefilimone.vercel.app/\n\nMeu Repositório:https://github.com/yazaldefilimonepinto`)}`;
  },
};
