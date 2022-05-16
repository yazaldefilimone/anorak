import { answerer } from '../shared/utils';

export class InvalidParamError {
  name: string;
  message: string;
  constructor(name: string) {
    this.message = answerer(`🤔 Falta ${name}! Por Favor Informa pra que eu possa atende-lo 🙂.`);
    this.name = 'InternarServerError';
  }
}
