import { BringMusicUseCase, LyricSongUseCase } from '@/data/use-cases';
import { AxiosHttpClient } from '@/infra/http';
import { WASocket } from '@adiwajshing/baileys';
import * as Genius from 'genius-lyrics';

const axiosHttpClient = new AxiosHttpClient();

const genius = new Genius.Client();
export const lyricSongFactory = new LyricSongUseCase(genius);
