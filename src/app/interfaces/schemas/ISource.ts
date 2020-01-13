export interface ISource {
  _id: string;
  name: string;
  author: string;
  isbn: string;
  posterID: string;
  sourceURL: string;
  type: string;
  followers: number;
  questions: number;
  edition: number;
  tags: string[];
}
