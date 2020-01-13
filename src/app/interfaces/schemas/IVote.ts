export interface IVote {
  _id: string;
  userID: string;
  answerID: string;
  questionID: string;
  type: string;
  vote: number;
}
