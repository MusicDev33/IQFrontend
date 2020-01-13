import { IQuestion } from '@interfaces/schemas/IQuestion';

export class Question implements IQuestion {
  _id: string;
  questionText: string;
  urlText: string;
  asker: string;
  askerID: string;
  askerHandle: string;
  subject: string;
  homeworkSource: string[];
  views: number;
  votes: number;
  details: string;
  time: string;
  tag: string[];
  answerNum: number;
  previewAnswer: any;
  type = 'question';
  tags: string[] = [];
}
