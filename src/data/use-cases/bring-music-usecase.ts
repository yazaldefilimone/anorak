import { IBringMusicUseCase } from '@/domain/use-cases';
import YouTubeMp3down, { IVideoTask } from 'youtube-mp3-downloader';
import { IAlgorithmTransformBytes, IYouTubeSearchHelper } from '@/data/protocols/helpers';
import { WASocket } from '@adiwajshing/baileys';
import { Letter } from '@/shared/letter';
import { botResponse } from '@/main/presentation/helpers';
import { promisify } from 'util';

type progress = {
  id: string;
  video: {
    percentage: number;
    transferred: number;
    length: number;
    remaining: number;
    eta: number;
    runtime: number;
    delta: number;
    speed: number;
  };
};
export class BringMusicUseCase implements IBringMusicUseCase {
  private readonly youtubeMp3down: YouTubeMp3down;
  private readonly youTubeSearchHelper: IYouTubeSearchHelper;
  private readonly videoInLoader: IVideoTask;
  private VideoProgress: progress;
  private readonly algorithmTransformBytes: IAlgorithmTransformBytes;
  constructor(
    youtubeMp3down: YouTubeMp3down,
    youTubeSearchHelper: IYouTubeSearchHelper,
    algorithmTransformBytes: IAlgorithmTransformBytes,
  ) {
    this.youtubeMp3down = youtubeMp3down;
    this.youTubeSearchHelper = youTubeSearchHelper;
    this.algorithmTransformBytes = algorithmTransformBytes;
  }

  async perform({ name }: IBringMusicUseCase.input, socket: WASocket, currentUser: string): Promise<any> {
    try {
      const resultSearch = await this.youTubeSearchHelper.find({ name });
      if (resultSearch instanceof Error) {
        return resultSearch;
      }

      this.youtubeMp3down.download(resultSearch.id);

      let youtubeProgressAsync = promisify(this.youtubeMp3down.on);
      this.VideoProgress = (await youtubeProgressAsync('progress')) as any;

      // this.youtubeMp3down.on('progress', ({ videoId, progress }) => {
      //   this.VideoProgress.push({ id: videoId, video: progress });
      //   console.log({ VideoProgress: this.VideoProgress });
      // });

      const sendFeedBack = async () => {
        const image = resultSearch.thumbnails ? resultSearch.thumbnails.url : '';
        const preMessage = `
          Estou processando o teu pedido. Baixando a  Musica com o nome: ${Letter.bold(resultSearch.title)}
          Velocidade do download: ${this.algorithmTransformBytes.execute(this.VideoProgress.video.speed)}
          \nPeco para Aguardar ${this.VideoProgress.video.eta} segundos que ja mando a tua musica
          Percentagem:${parseFloat(String(this.VideoProgress.video.percentage)).toFixed(2)} %
          `;
        await socket.sendMessage(currentUser, { image: { url: image }, caption: botResponse(preMessage, true) });
      };

      this.youtubeMp3down.on('error', async (error) => {
        await socket.sendMessage(currentUser, { text: botResponse('Ouve um Erro ') });
      });

      this.youtubeMp3down.on('finished', async (err, data) => {
        await socket.sendMessage(currentUser, { audio: { url: data.file }, mimetype: 'audio/mp4' });
      });

      setTimeout(async () => await sendFeedBack(), 3000);
    } catch (err) {}
  }
}
