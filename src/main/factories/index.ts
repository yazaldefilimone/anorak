import { BringMusicUseCase, LyricSongUseCase, GetBibliaUseCase } from '@/data/use-cases';
import { AxiosHttpClient } from '@/infra/http';
import * as Genius from 'genius-lyrics';
import YtdlCore from 'ytdl-core';

import YouTubeMp3down from 'youtube-mp3-downloader';

import { AlgorithmTransformBytes, YouTubeSearchHelper } from '@/infra/helpers';
import { youtubeDownConfig } from '../settings';
import { env } from '@/shared/env';
const axiosHttpClient = new AxiosHttpClient();
const biblia_api = env.biblia.api;
const genius = new Genius.Client();
const youTubeSearchHelper = new YouTubeSearchHelper();
const youtubeMp3down = new YouTubeMp3down(youtubeDownConfig);
const algorithmTransformBytes = new AlgorithmTransformBytes();
export const lyricSongFactory = new LyricSongUseCase(genius);
export const getBibliaUseCase = new GetBibliaUseCase(axiosHttpClient, biblia_api);

export const bringMusicFactory = new BringMusicUseCase(youtubeMp3down, youTubeSearchHelper, algorithmTransformBytes);
