import dotenv from 'dotenv';
dotenv.config();
export const env = {
  google: {
    key: process.env.GOOGlE_KEY as string,
  },
  biblia: {
    api: process.env.BIBLIAPI as string,
  },
};
