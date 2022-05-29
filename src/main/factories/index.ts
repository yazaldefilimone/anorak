import { BringMusicUseCase } from '@/data/use-cases';
import { AxiosHttpClient } from '@/infra/http';
import { BringMusicController } from '@/presentation/controllers';
import { WASocket } from '@adiwajshing/baileys';

const axiosHttpClient = new AxiosHttpClient();
const bringMusicUseCase = new BringMusicUseCase(axiosHttpClient, 'https//yazaldedev.com');
export const bringMusicFactory = (baileysClient: WASocket) => {
  const bringMusicController = new BringMusicController(bringMusicUseCase, baileysClient);
  bringMusicController.execute();
};
