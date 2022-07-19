import { WASocket } from '@adiwajshing/baileys';

export interface IGetBibliaUseCase {
  perform: (data: IGetBibliaUseCase.input, socket: WASocket, currentUser: string) => IGetBibliaUseCase.model;
}

export namespace IGetBibliaUseCase {
  export type model = Promise<{ text: string } | Error>;
  export type input = { book: string, chapter: string, lang:string };
}
// https://bible-api.com/joao+4:16?translation=almeida