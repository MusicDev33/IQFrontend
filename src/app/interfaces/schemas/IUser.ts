export interface IUser {
  _id: string;
  name: string;
  bio: string;
  email: string;
  handle: string;
  phoneNumber: string;
  password: string;
  type: string;
  googleID: string;
  profileImage: string;
  customization: any;
  knowledge: any;
  credentials: any;
  profileHits: number;
  paidProgram: boolean;
  fbTokens: string[];
  currentSources: string[];
  currentSubjects: string[];
}
