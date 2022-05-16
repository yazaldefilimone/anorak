const trans_API = ({ text, toFrom }: { text: string; toFrom: string }) =>
  `https://api.mymemory.translated.net/get?q=${text}&langpair=${toFrom}`;

import axios from 'axios';
import { InternalServerError, NotFoundError } from '../../core/errors';

type BibleProps = {
  text: string;
  toFrom: string;
};

export class Translated {
  async trans(data: BibleProps) {
    try {
      const response = await axios(trans_API(data));
      console.log(response.statusText);
      if (response.statusText !== 'OK') return new NotFoundError();
      return response.data;
    } catch (error: any) {
      if (error.response.status == 404) return new NotFoundError();
      return new InternalServerError();
    }
  }
}
