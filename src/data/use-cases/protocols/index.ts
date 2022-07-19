type Verses = {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
};
export type GetBibliaRequest = {
  reference: string;
  verses: Array<Verses>;
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
};
