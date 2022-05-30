import { IBringVideoUseCase } from '@/domain/use-cases';
import { IAlgorithmTransformBytes, IYouTubeSearchHelper } from '@/data/protocols/helpers';
import { WASocket } from '@adiwajshing/baileys';
import { Letter } from '@/shared/letter';
import { errorResponse, OkResponse, response as ResponseBot } from '@/main/presentation/helpers';
import { UnexpectedError } from '@/domain/errors';
import YtdlCore from 'ytdl-core';

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
export class BringVideoUseCase implements IBringVideoUseCase {
  private readonly youTubeSearchHelper: IYouTubeSearchHelper;
  private VideoProgress: progress[];
  private readonly algorithmTransformBytes: IAlgorithmTransformBytes;
  ytdlCore: typeof YtdlCore;
  constructor(youTubeSearchHelper: IYouTubeSearchHelper, algorithmTransformBytes: IAlgorithmTransformBytes, ytdlCore: typeof YtdlCore) {
    this.youTubeSearchHelper = youTubeSearchHelper;
    this.algorithmTransformBytes = algorithmTransformBytes;
    this.VideoProgress = [];
    this.ytdlCore = ytdlCore;
  }

  async perform({ name }: IBringVideoUseCase.input, socket: WASocket, currentUser: string): Promise<any> {
    try {
      const resultSearch = await this.youTubeSearchHelper.find({ name });
      if (resultSearch instanceof Error) {
        return resultSearch;
      }
      const msg = `Baixando o video:${resultSearch.title}`;
      await socket.sendMessage(currentUser, OkResponse(msg, resultSearch.thumbnails?.url as string));

      const response = await this.ytdlCore.getInfo(resultSearch.link);
      const format = response.formats[0];
      const videoInfo = {
        qualityNumber: format.qualityLabel,
        qualityText: format.quality,
        fps: format.fps,
        url: format.url,
      };
      const infos = `Qualidade: ${videoInfo.qualityNumber} | ${videoInfo.qualityText}\nfps:${videoInfo.fps}`;

      await socket.sendMessage(currentUser, { video: { url: videoInfo.url }, mimetype: 'video/mp4', caption: infos });
    } catch (err: any) {
      await socket.sendMessage(currentUser, errorResponse(new UnexpectedError().message));
    }
  }
}
