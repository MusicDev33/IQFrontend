import { IResponse } from './IResponse';

export interface IHandleTakenResponse extends IResponse {
  userIsTaken: boolean;
}
