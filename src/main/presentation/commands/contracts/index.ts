import { Letter } from '@/shared/letter';

export const contracts = {
  about: () => {
    return `
    ┏ 🤖  *Anorak - Bot* 🤖
  ┯┷ ☾ Study Commands ☽
  ╽
  ┠❥ _!biblia [mateus 12:2]_
  ╿
  ┯┷ ☾ Downloader Commandos ☽
  ╽
  ┠❥ _!mp3 [nome do artista/musica]_
  ┠❥ _!letra [nome do artista/musica]_
  ┠❥ _!facebook [link do video facebook]_
  ╿
  ┷┯ ☾ Outros Commandos ☽
  ╽
  ┠❥ _!sobre mim_
  ┠❥ _!sobre_
  ┠❥ _!comandos_
  ┠❥ _!menu_
  ╰╼❥ Envie o comando *!sobre* para saber mais sobre!!.
    `;
  },

  owner: () => {
    return `${Letter.monoSpace('Hi There!!\nMe chamo')}  *Yazalde Filimone*  ${Letter.monoSpace('tenho')} *18 anos* ${Letter.monoSpace(
      'e sou  Apenas um garoto introvertido que gosta de animes e cosplay\n\nSoftware Engineer na A4PM - Analytics for Public Management. \n\nSou entusiasta da computação académica e sempre em constante aprendizado\n\n',
    )}*Meu Site:* https://yazaldefilimone.vercel.app/\n\n*Meu Repositório:* https://github.com/yazaldefilimonepinto`;
  },
  help: (user: string) => {
    return `Muito Obrigado ${user} pelo teu feedback/Ideia.\n Ja registarei, e notifiquei e mandei um email para Yazalde Filimone no final de semana ele Implementa isso.`;
  },
};
