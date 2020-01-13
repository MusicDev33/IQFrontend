import { IVote } from '@interfaces/schemas/IVote';

export class Vote implements IVote {
  _id: string;
  vote: number;
  userID: string;
  answerID: string;
  questionID: string;
  type = 'vote';
}
