import { IGetBibliaUseCase } from '@/domain/use-cases';
import { GetBibliaRequest } from '@/data/use-cases/protocols';
import { WASocket } from '@adiwajshing/baileys';
import { IHttpClient } from '@/data/protocols/http';

export class GetBibliaUseCase implements IGetBibliaUseCase {
  private readonly httpClient: IHttpClient<GetBibliaRequest>;
  private readonly url: string;
  constructor(httpClient: IHttpClient, url: string) {
    this.httpClient = httpClient;
    this.url = url;
  }

  async perform(data: IGetBibliaUseCase.input): IGetBibliaUseCase.model {
    const { book, chapter, lang } = data;
    let translation: string;

    if (lang?.toLowerCase() == 'ingles' || lang?.toLowerCase() == 'Ingles') {
      translation = 'web';
    } else {
      translation = 'almeida';
    }

    const response = await this.httpClient.request({
      url: `${this.url}/${book}+${chapter}?translation=${translation}`,
      method: 'get',
    });

    let text: string = '';
    console.log(response.statusCode);
    if (response.statusCode === 200) {
      if (response?.body?.verses.length && response.body.verses.length > 1) {
        response.body.verses.map((verse) => {
          const currentVerse = `*${verse.book_name}-${verse.chapter}:${verse.verse}*\n${verse.text}\n\n`;
          text = text.concat(currentVerse);
        });
      } else {
        const verse = response?.body?.verses[0] as any;
        const currentVerse = `*${verse.book_name}-${verse.chapter}:${verse.verse}*\n${verse.text}`;
        text = text.concat(currentVerse);
      }
    }

    if (response.statusCode === 404) {
      return new Error(`Nao achei nada a respeito: de ${data}`);
    }
    if (response.statusCode !== 200 && response.statusCode !== 404) {
      return new Error('Ouve um Erro interno, Volte a tentar numa outra hora...');
    }

    return { text };
  }
}
