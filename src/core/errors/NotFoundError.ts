export class NotFoundError extends Error {
  constructor() {
    super(`🔍 Nao encontrei o que me pediu. Minhas sinceras desculpas....`);
    this.name = 'NotFoundError';
  }
}
