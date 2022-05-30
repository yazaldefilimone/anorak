import { BringMusicUseCase, LyricSongUseCase, BringVideoUseCase } from '@/data/use-cases';
import { AxiosHttpClient } from '@/infra/http';
import * as Genius from 'genius-lyrics';
import YtdlCore from 'ytdl-core';

import YouTubeMp3down from 'youtube-mp3-downloader';

import { AlgorithmTransformBytes, YouTubeSearchHelper } from '@/infra/helpers';
import { youtubeDownConfig } from '../settings';
const axiosHttpClient = new AxiosHttpClient();

const genius = new Genius.Client();
const youTubeSearchHelper = new YouTubeSearchHelper();
const youtubeMp3down = new YouTubeMp3down(youtubeDownConfig);
const algorithmTransformBytes = new AlgorithmTransformBytes();
export const lyricSongFactory = new LyricSongUseCase(genius);
export const bringMusicFactory = new BringMusicUseCase(youtubeMp3down, youTubeSearchHelper, algorithmTransformBytes);
export const bringVideoFactory = new BringVideoUseCase(youTubeSearchHelper, algorithmTransformBytes, YtdlCore);
