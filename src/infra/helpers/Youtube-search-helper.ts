import { IYouTubeSearchHelper } from '@/data/protocols/helpers';
import { NotfoundError, UnexpectedError } from '@/domain/errors';
import { youtubeSearchConfig } from '@/main/settings';
import youtubeSearch, { YouTubeSearchOptions } from 'youtube-search';

export class YouTubeSearchHelper implements IYouTubeSearchHelper {
  private readonly youtubeSearch: typeof youtubeSearch;
  private readonly options: YouTubeSearchOptions;

  constructor() {
    this.youtubeSearch = youtubeSearch;
    this.options = youtubeSearchConfig;
  }

  async find({ name }: IYouTubeSearchHelper.input): IYouTubeSearchHelper.model {
    try {
      const result = await this.youtubeSearch(name, this.options);

      if (!result.results) {
        return new NotfoundError();
      }

      if (!result.results[0]) {
        return new NotfoundError();
      }
      const payload = {
        ...result.results[0],
        thumbnails: result.results[0].thumbnails.default,
      };
      return payload;
    } catch (error) {
      return new UnexpectedError();
    }
  }
}
