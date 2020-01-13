export interface IQuestion {
  _id: string;
  questionText: string;
  urlText: string;
  asker: string;
  askerID: string;
  askerHandle: string;
  subject: string;
  details: string;
  time: string;
  type: string;
  views: number;
  votes: number;
  answerNum: number;
  tags: string[];
  homeworkSource: string[];
  previewAnswer: any;
}
