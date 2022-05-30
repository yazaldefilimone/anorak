import { NotfoundError, UnexpectedError } from '@/domain/errors';

export interface IYouTubeSearchHelper {
  find: ({ name }: IYouTubeSearchHelper.input) => IYouTubeSearchHelper.model;
}

export namespace IYouTubeSearchHelper {
  export type input = {
    name: string;
  };
  export type model = Promise<Model | UnexpectedError | NotfoundError>;
}

type Model = {
  id: string;
  link: string;
  kind: string;
  publishedAt: string;
  channelId: string;
  channelTitle: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
};

type Thumbnails = {
  url: string;
  width: number;
  height: number;
};
