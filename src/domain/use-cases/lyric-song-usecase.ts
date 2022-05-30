import { bringMusic } from '../entities';

export interface ILyricSongUseCase {
  perform: (data: ILyricSongUseCase.input) => ILyricSongUseCase.model;
}

export namespace ILyricSongUseCase {
  export type model = Promise<{ lyric: string } | Error>;
  export type input = bringMusic;
}
