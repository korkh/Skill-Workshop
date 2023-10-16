import { IPhoto } from "./photo";
import { IUser } from "./user";

export interface IProfile {
  userName: string;
  displayName: string;
  image?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  following: boolean;
  photos?: IPhoto[];
}

export class Profile implements IProfile {
  constructor(user: IUser) {
    this.userName = user.userName;
    this.displayName = user.displayName;
    this.image = user.image;
    this.bio = "";
  }
  userName: string;
  displayName: string;
  image?: string | undefined;
  bio?: string | undefined;
  followersCount: number = 0;
  followingCount: number = 0;
  following: boolean = false;
  photos?: IPhoto[] | undefined;
}

//For profile's events tab
export interface IUserTraining {
  id: string;
  title: string;
  category: string;
  date: Date;
}
