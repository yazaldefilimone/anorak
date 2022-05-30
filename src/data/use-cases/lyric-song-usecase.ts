import { NotfoundError, UnexpectedError } from '@/domain/errors';
import { ILyricSongUseCase } from '@/domain/use-cases';
import * as Genius from 'genius-lyrics';

export class LyricSongUseCase implements ILyricSongUseCase {
  private readonly genius: Genius.Client;
  constructor(genius: Genius.Client) {
    this.genius = genius;
  }

  async perform({ name }: ILyricSongUseCase.input): ILyricSongUseCase.model {
    try {
      const result = await this.genius.songs.search(name);
      if (!result || !result[0]) {
        return new NotfoundError();
      }

      const lyric = await result[0].lyrics();
      return { lyric };
    } catch (err: any) {
      if (err.message == 'No result was found') {
        return new NotfoundError();
      }
      return new UnexpectedError();
    }
  }
}
