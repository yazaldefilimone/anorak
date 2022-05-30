import { IBringMusicUseCase } from '@/domain/use-cases';
import { HttpStatusCode, IHttpClient } from '@/data/protocols/http';
import { NotfoundError, UnexpectedError } from '@/domain/errors';
import YouTubeMp3down, { IVideoTask } from 'youtube-mp3-downloader';
import YouTubeSearch from 'youtube-search';
import { IYouTubeSearchHelper } from '@/data/protocols/youtube-search-helper';

export class BringMusicUseCase implements IBringMusicUseCase {
  private readonly youtubeMp3down: YouTubeMp3down;
  private readonly youTubeSearchHelper: IYouTubeSearchHelper;
  private readonly videoInLoader: IVideoTask;

  constructor(youtubeMp3down: YouTubeMp3down, youTubeSearchHelper: IYouTubeSearchHelper) {
    this.youtubeMp3down = youtubeMp3down;
    this.youTubeSearchHelper = youTubeSearchHelper;
  }

  async perform({ name }: IBringMusicUseCase.input): IBringMusicUseCase.model {
    try {
      const resultSearch = await this.youTubeSearchHelper.find({ name });
      if (resultSearch instanceof Error) {
        return resultSearch;
      }

      this.youtubeMp3down.download(resultSearch.id);

      this.youtubeMp3down.on('progress', (data) => {
        this.videoInLoader;
      });

      this.youtubeMp3down.on('error', function (error, data) {});

      this.youtubeMp3down.on('finished', function (error, data) {});
    } catch (err) {}
  }
}
