import makeWASocket from '@adiwajshing/baileys';

export interface IController {
  execute<T>(client: IController.Client): IController.modal<T>;
}

export namespace IController {
  export type Client = typeof makeWASocket;
  export type modal<T = any> = Promise<T>;
}
