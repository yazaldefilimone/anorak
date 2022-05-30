import { Sound } from '@/domain/entities';

export interface IBringMusicUseCase {
  perform: (data: IBringMusicUseCase.input) => IBringMusicUseCase.model;
}

export namespace IBringMusicUseCase {
  export type model = Promise<{ path: string } | Error>;
  export type input = Sound;
}
