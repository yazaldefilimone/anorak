export class NotfoundError extends Error {
  constructor() {
    super(`Nao encontrei o que me pediu 👻👻. Verifique se ha um erro de escrita!`);
    this.name = 'NotfoundError';
  }
}
