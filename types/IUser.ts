export interface IUser {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  premium?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
