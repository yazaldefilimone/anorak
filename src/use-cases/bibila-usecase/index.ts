import { Message, Whatsapp } from 'venom-bot';
import { InternalServerError } from '../../core/errors';
import { InvalidParamError } from '../../errors/InvalidParamsError';
import { BibleService } from '../../services/BibleService';
import { answerer } from '../../shared/utils';
import translated from '@vitalets/google-translate-api';

export class BibliaUseCase {
  private readonly bibleService: BibleService;
  constructor() {
    this.bibleService = new BibleService();
  }
  async execute(user: Message, client: Whatsapp) {
    const { body } = user;

    const [command, book, chapter] = body.split(' ');
    console.log(chapter);

    if (!book) {
      const response = await client.sendText(user.from, new InvalidParamError('*lIVRO*').message);
      return;
    }

    const result = await this.bibleService.getVerse({ book, chapter });
    if (result instanceof Error) {
      const response = await client.sendText(user.from, answerer(result.message));
      return;
    }
    if (!result.reference && !result.text) {
      const response = await client.sendText(user.from, answerer('😭 Ouve Um Erro Inesperado'));
      return;
    }
    const request = `*${result.reference}*\n${result.text}`;
    const response = await client.sendText(user.from, answerer(request));
  }
}
