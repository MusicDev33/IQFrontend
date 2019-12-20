import { IUser } from '@interfaces/schemas/IUser';

export class User implements IUser {
  _id: string = '';
  name: string = '';
  bio: string = '';
  handle: string = '';
  email: string = '';
  phoneNumber: string = '';
  profileImage: string = '';
  googleID: string = '';
  currentSources: Array<any> = [];
  currentSubjects: Array<any> = [];
  knowledge: any = {};
  type: string = '';
  profileHits: number = 0;
  credentials: any = {}; // FIX - No Any!!!
  customization: any = {};
  paidProgram: boolean = false;
  test: boolean = false;

  getMongoID(): string {
    return '' + this._id;
  }
}
