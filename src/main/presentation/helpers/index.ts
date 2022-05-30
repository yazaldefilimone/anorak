export const botResponse = (message: string, type = true) => {
  return `
  ┏ 🤖  *ANORAK* 🤖
  ┷┯ ☾ *${type ? 'Bem Sucesso 🥳🤩✨' : 'Ouve Um Erro ❌❗'}* ☽\n${message}
  `;
};
