export interface IUser {
  userName: string;
  displayName: string;
  token: string;
  image?: string;
}

export interface IUserFormValues {
  displayName?: string;
  userName?: string;
  email: string;
  password: string;
}
