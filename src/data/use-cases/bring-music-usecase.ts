import { IBringMusicUseCase } from '@/domain/use-cases';
import YouTubeMp3down, { IVideoTask } from 'youtube-mp3-downloader';
import { IAlgorithmTransformBytes, IYouTubeSearchHelper } from '@/data/protocols/helpers';
import { WASocket } from '@adiwajshing/baileys';
import { Letter } from '@/shared/letter';
import { response } from '@/main/presentation/helpers';
import { UnexpectedError } from '@/domain/errors';

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
  index: boolean;
};
export class BringMusicUseCase implements IBringMusicUseCase {
  private readonly youtubeMp3down: YouTubeMp3down;
  private readonly youTubeSearchHelper: IYouTubeSearchHelper;
  private readonly videoInLoader: IVideoTask;
  private VideoProgress: progress[];
  errorMessage:string;
  private readonly algorithmTransformBytes: IAlgorithmTransformBytes;
  constructor(
    youtubeMp3down: YouTubeMp3down,
    youTubeSearchHelper: IYouTubeSearchHelper,
    algorithmTransformBytes: IAlgorithmTransformBytes,
  ) {
    this.youtubeMp3down = youtubeMp3down;
    this.youTubeSearchHelper = youTubeSearchHelper;
    this.algorithmTransformBytes = algorithmTransformBytes;
    this.VideoProgress = [];
    this.errorMessage = new UnexpectedError().message
  }

  async perform({ name }: IBringMusicUseCase.input, socket: WASocket, currentUser: string): Promise<any> {
    try {
      const resultSearch = await this.youTubeSearchHelper.find({ name });
      if (resultSearch instanceof Error) {
        return resultSearch;
      }

      this.youtubeMp3down.download(resultSearch.id);

      this.youtubeMp3down.on('progress', async ({ videoId, progress }) => {
        const isExists = this.VideoProgress.find((content) => content.id == videoId);
        if (isExists) {
          console.log('entrouuuuuuuuuuuuuu');
        } else {
          this.VideoProgress.push({ id: videoId, video: progress, index: true });

          const preMessage = `Baixando a  Musica com o nome: ${Letter.bold(resultSearch.title)}\n\n${
            progress.eta
          } segundos pra o envio da musica\n\n${Letter.bold(`${parseFloat(String(progress.percentage)).toFixed(2)}%`)}`;
        
          await socket.sendMessage(currentUser, { text: response(preMessage, true) });
        }
      });

      this.youtubeMp3down.on('error', async (error) => {
        return await socket.sendMessage(currentUser, { text: response(error, false)});
      });

      this.youtubeMp3down.on('finished', async (err, data) => {
        if (err) {
          this.VideoProgress = [];
          return await socket.sendMessage(currentUser, { text: response(err, false)});
        }
        this.VideoProgress = [];
        return await socket.sendMessage(currentUser, { audio: { url: data.file }, mimetype: 'audio/mp3' });
      });
    } catch (err: any) {
      return await socket.sendMessage(currentUser, { text: response(this.errorMessage, false)});
    }
  }
}
