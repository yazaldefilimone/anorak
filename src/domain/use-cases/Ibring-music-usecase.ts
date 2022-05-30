import { Sound } from '@/domain/entities';
import { WASocket } from '@adiwajshing/baileys';

export interface IBringMusicUseCase {
  perform: (data: IBringMusicUseCase.input, socket: WASocket, currentUser: string) => IBringMusicUseCase.model;
}

export namespace IBringMusicUseCase {
  export type model = Promise<{ path: string } | Error>;
  export type input = Sound;
}
