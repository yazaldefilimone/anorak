export class NotfoundError extends Error {
  constructor(name: string) {
    super(`${name} nao  encontrado!`);
    this.name = 'NotfoundError';
  }
}
