import { User } from '@classes/user';
import { IResponse } from './IResponse';

export interface IAuthResponse extends IResponse {
  token: string;
  user: User;
}
