import { IMongoObject } from '../interfaces/IMongoObject';
import { IServerResponse } from '../interfaces/IServerResponse';

export class Vote implements IServerResponse, IMongoObject {
  _id: string;
  vote: number;
  userid: string;
  answerid: string;
  questionid: string;

  success: boolean;
}
