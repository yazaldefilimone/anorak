import { IBringMusicUseCase } from '@/domain/use-cases';
import { IController } from '@/presentation/protocols/IController';
import { WASocket } from '@adiwajshing/baileys';

export class BringMusicController implements IController {
  private readonly bringMusicUseCase: IBringMusicUseCase;
  private readonly baileysClient: WASocket;
  constructor(bringMusicUseCase: IBringMusicUseCase, baileysClient: WASocket) {
    this.bringMusicUseCase = bringMusicUseCase;
    this.baileysClient = baileysClient;
  }

  async execute(): IController.modal {
    this.baileysClient.ev.on('messages.upsert', (content) => {
      console.log({ content });
      // this.bringMusicUseCase.perform();
    });
  }
}
