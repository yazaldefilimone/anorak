import { Sound } from '@/domain/entities';
import { WASocket } from '@adiwajshing/baileys';

export interface IBringVideoUseCase {
  perform: (data: IBringVideoUseCase.input, socket: WASocket, currentUser: string) => IBringVideoUseCase.model;
}

export namespace IBringVideoUseCase {
  export type model = Promise<{ path: string } | Error>;
  export type input = Sound;
}
