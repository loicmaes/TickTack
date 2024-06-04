import type {IUser} from "~/types/IUser";

export interface ISession {
  id?: number;
  userUid: string;
  authToken: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  user?: IUser;
}
