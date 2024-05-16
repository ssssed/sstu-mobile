export type AuthStatus = 'authenticated' | 'unauthenticated';

export type UserParamsType = {
  avatar: string | null;
  studentNumber: number;
  groupName: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}

export type UserSignInParamsType = Pick<UserParamsType, "phone" | 'password'>

export type UserType = {
  id: number;
  studentNumber: number;
  groupName: string;
  avatar: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  status: 'Active' | 'Deactivate';
}

export type UserResponseType = {
  user: UserType;
  token: string;
}