export interface IUser {
  _id: string;
  name: string;
  bio: string;
  handle: string;
  email: string;
  phoneNumber: string;
  password: string;
  profileImage: string;
  googleID: string;
  currentSource: Array<any>;
  currentSubjects: Array<any>;
  knowledge: any;
  type: string;
  profileHits: number;
  credentials: any; // FIX - No Any!!!
  customization: any;

  getMongoID();
}
