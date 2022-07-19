import { WASocket } from '@adiwajshing/baileys';

export interface IGetBibliaUseCase {
  perform: (data: IGetBibliaUseCase.input) => IGetBibliaUseCase.model;
}

export namespace IGetBibliaUseCase {
  export type model = Promise<{ text: string } | Error>;
  export type input = { book: string; chapter: string; lang: string };
}
