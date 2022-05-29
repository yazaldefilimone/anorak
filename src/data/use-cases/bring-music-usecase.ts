import { IBringMusicUseCase } from '@/domain/use-cases';
import { HttpStatusCode, IHttpClient } from '@/data/protocols/http';
import { NotfoundError, UnexpectedError } from '@/domain/errors';

export class BringMusicUseCase implements IBringMusicUseCase {
  private readonly httpClient: IHttpClient;
  private readonly url: string;

  constructor(httpClient: IHttpClient, url: string) {
    this.httpClient = httpClient;
    this.url = url;
  }

  async perform(data: IBringMusicUseCase.input): IBringMusicUseCase.model {
    const result = await this.httpClient.request({ url: this.url, method: 'post', body: data });
    switch (result.statusCode) {
      case HttpStatusCode.ok:
        return result.body;
      case HttpStatusCode.notFound:
        return new NotfoundError('musica');
      default:
        return new UnexpectedError();
    }
  }
}
