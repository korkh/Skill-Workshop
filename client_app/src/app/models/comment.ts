export interface IChatComment {
    id: number;
    createdAt: Date; //used any avoid getting typescript error for Date
    body: string;
    userName: string;
    displayName: string;
    image: string;
  }