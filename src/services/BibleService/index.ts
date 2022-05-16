import axios from 'axios';
import { InternalServerError, NotFoundError } from '../../core/errors';

type BibleProps = {
  book: string;
  chapter: string;
};

const BIBLE_API = ({ book, chapter }: BibleProps) => `https://bible-api.com/${book}+${chapter}?translation=almeida`;

export class BibleService {
  async getVerse(data: BibleProps) {
    try {
      const response = await axios(BIBLE_API(data));
      console.log(response.statusText);
      if (response.statusText !== 'OK') return new NotFoundError();
      return response.data;
    } catch (error: any) {
      if (error.response.status == 404) return new NotFoundError();
      return new InternalServerError();
    }
  }
}
