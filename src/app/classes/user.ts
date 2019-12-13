import { IUser } from '../interfaces/schemas/IUser';

export class User implements IUser {
  _id: string;
  name: string;
  bio: string;
  handle: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  googleID: string;
  currentSources: Array<any>;
  currentSubjects: Array<any>;
  knowledge: any;
  type: string;
  profileHits: number;
  credentials: any; // FIX - No Any!!!
  customization: any;

  getMongoID(): string {
    return '' + this._id;
  }
}
