import { Letter } from '@/shared/letter';

export const contracts = {
  about: () => {
    return `
    ┏ 🤖  * ANORAK * 🤖
  ╿
  ┷┯ ☾ Group Commands ☽
  ╽
  ┠❥ *!add 62858xxxxx*
  ┠❥ *!ban @username*
  ┠❥ *!promover @username*
  ┠❥ *!remove @username*
  ┠❥ *!all*
  ┠❥ *!adminList*
  ┠❥ *!ownerGroup*
  ┠❥ *!leave*
  ┠❥ *!linkGroup*
  ┠❥ *!kickAll*
  ┠❥ *!NEWS [enable|disable]*
  ┠❥ *!welcome [enable|disable]*
  ╿
  ┯┷ ☾ Study Commands ☽
  ╽
  ┠❥ *!google [o que ser pesquisar]*
  ┠❥ *!biblia [mateus 12:2]*
  ╿
  ┯┷ ☾ Downloader Commands ☽
  ╽
  ┠❥ *!mp3 [nome]*
  ┠❥ *!mp4 [nome]*
  ┠❥ *!tiktok [link do video Tiktok]*
  ┠❥ *!facebook [link do video facebook]*
  ╿
  ┷┯ ☾ Others Commands ☽
  ╽
  ┠❥ *!sticker*
  ┠❥ *!stickerGif*
  ┠❥ *!criador do software*
  ┠❥ *!sobre mim*
  ┠❥ *!wiki [query]*
  ┠❥ *!anime [query]*
  ┠❥ *!meme*
  ┠❥ *!join [linkGroup]*
  ╿
  ╿
  ╰╼❥ Envie o comando *!sobre [comando]* para descobrir a função e como usar o comando que passar entre chavetas, DEVE LER!!.
    `;
  },

  owner: () => {
    return `
      ┏ 🤖  *ANORAK* 🤖
    ┷┯ ☾ *Criador deste Software(bot)* ☽\n\n${Letter.monoSpace(
      `Sou Yazalde Filimone tenho 17 anos de idade e sou Desenvolvedor de software Apenas um garoto introvertido que gosta de animes e cosplay. \nProgramador FULLSTACK e entusiasta da computação académica e sempre em constante aprendizado\n\nGIthub: https://github.com/yazaldefilimonepinto`,
    )}
    `;
  },
};
