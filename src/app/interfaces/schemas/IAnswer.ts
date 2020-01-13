export interface IAnswer {
  _id: string;
  answerText: string;
  poster: string;
  posterID: string;
  posterHandle: string;
  questionURL: string;
  questionID: string;
  questionText: string;
  time: string;
  type: string;
  views: number;
  votes: number;
  comments: any[];
}
