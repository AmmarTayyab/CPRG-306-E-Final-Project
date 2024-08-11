import { Status, User } from '@prisma/client';

export interface Response {
  status: string;
  message: string;
}

export type UserProfile = Omit<User, 'password'>;
export interface UserInfo {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
  status: Status;
}
