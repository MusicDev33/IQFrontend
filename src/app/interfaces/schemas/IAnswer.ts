export interface IAnswer {
  _id: string;

  answerText: string;
  votes: number;
  poster: string;
  posterID: string;
  posterHandle: string;
  views: number;
  comments: Array<object>;
  questionURL: string;
  questionText: string;
  time: string;

  getMongoID();
}
