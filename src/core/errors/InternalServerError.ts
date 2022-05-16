export class InternalServerError extends Error {
  constructor() {
    super('❌ Ouve alguns erro interno. 🙏🏻 Desculpa pelos transtornos que isso possa estar a lhe causar.');
    this.name = 'InternarServerError';
  }
}
