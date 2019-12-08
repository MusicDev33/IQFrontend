export interface IQuestion {
  _id: string;
  questionText: string;
  urlText: string;
  asker: string;
  askerID: string;
  askerHandle: string;
  subject: string;
  homeworkSource: string;
  views: number;
  votes: number;
  details: string;
  time: string;
  tag: Array<string>;
  answerNum: number;
  previewAnswer: any;

  getMongoID(): string;
}
