import { env } from '@/shared/env';
import { resolve } from 'path';
import { YouTubeSearchOptions } from 'youtube-search';
export const youtubeDownConfig = {
  ffmpegPath: 'https://git.ffmpeg.org/gitweb/ffmpeg.git',
  outputPath: resolve(__dirname, '..', '..', '..', 'cache', 'mp3'), // Output file location (default: the home directory)
  youtubeVideoQuality: 'highestaudio', // Desired video quality (default: highestaudio)
  queueParallelism: 2, // Download parallelism (default: 1)
  progressTimeout: 2000, // Interval in ms for the progress reports (default: 1000)
  allowWebm: false, // Enable download from WebM sources (default: false)
};
export const youtubeSearchConfig: YouTubeSearchOptions = {
  maxResults: 3,
  key: env.google.key,
};
