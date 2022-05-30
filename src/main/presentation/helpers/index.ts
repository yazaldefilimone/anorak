import { resolve } from 'path';

const error = resolve(__dirname, '..', '..', '..', '..', 'cache', 'status', 'error.jpg');
export const errorResponse = (message: string) => {
  return {
    image: { url: error },
    caption: `
    ┏ 🤖  *ANORAK* 🤖
    ┷┯ ☾ *Status: Error ❌❗* ☽\n${message}
    `,
  };
};
export const OkResponse = (message: string, img: string) => {
  return {
    image: { url: img },
    caption: `
    ┏ 🤖  *ANORAK* 🤖
    ┷┯ ☾ *Status: Sucesso 🥳🤩✨* ☽\n${message}
    `,
  };
};

export const response = (message: string, type = true) => {
  return `┏ 🤖  *ANORAK* 🤖
  ┷┯ ☾ ${type ? '*Status: Sucesso 🥳🤩✨*' : '*Status: Sucesso 🥳🤩✨*'} ☽\n${message}
  `;
};
