import { IAnswer } from '@interfaces/schemas/IAnswer';

export class Answer implements IAnswer {
  _id: string;

  answerText: string;
  questionID: string;
  votes: number;
  poster: string;
  posterID: string;
  posterHandle: string;
  views: number;
  comments: any[];
  questionURL: string;
  questionText: string;
  time: string;
  type = 'answer';
}
