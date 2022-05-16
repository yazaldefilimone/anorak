import { Message, Whatsapp } from 'venom-bot';
import { InvalidParamError } from '../../errors/InvalidParamsError';
import { Translated } from '../../services/Translant';
import { answerer } from '../../shared/utils';
import translated from '@vitalets/google-translate-api';

export class TranslatedUseCase {
  private readonly translated: Translated;
  constructor() {
    this.translated = new Translated();
  }
  async execute(user: Message, client: Whatsapp) {
    const { body } = user;

    const [command, toFrom, text] = body.split(':');

    if (!text) {
      const response = await client.sendText(user.from, new InvalidParamError('*o texto*').message);
      return;
    }

    if (!toFrom) {
      const response = await client.sendText(user.from, new InvalidParamError('*as linguas*').message);
      return;
    }

    // const result = await this.translated.trans({ text: text.trim(), toFrom: toFrom.trim() });
    // if (result instanceof Error) {
    //   const response = await client.sendText(user.from, answerer(result.message));
    //   return;
    // }
    // console.log(result);
    // if (!result.matches[0]) {
    //   const response = await client.sendText(user.from, answerer('Ouve um erro Inesperado'));
    //   return;
    // }
    // const texto = result.responseData.translatedText;
    // const percentagem = `${result.responseData.match}`;
    // const respo = `${texto}\n\n **Acerto: ${percentagem.split('.')[1]}%**`;
    const respo = await translated(text.trim(), { to: 'en' });
    const response = await client.sendText(user.from, answerer(respo.text));
  }
}
