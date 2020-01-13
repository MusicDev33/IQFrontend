import { IUser } from '@interfaces/schemas/IUser';

export class User implements IUser {
  _id = '';
  name = '';
  bio = '';
  handle = '';
  email = '';
  phoneNumber = '';
  profileImage = '';
  googleID = '';
  currentSources: any[] = [];
  currentSubjects: any[] = [];
  knowledge: any = {};
  type = 'user';
  profileHits = 0;
  credentials: any = {}; // FIX - No Any!!!
  customization: any = {};
  paidProgram = false;
  password = '';
  fbTokens: string[] = [];

  getMongoID(): string {
    return '' + this._id;
  }
}
