export type AuthStatus = 'authenticated' | 'unauthenticated';

export type UserParamsType = {
  avatar: string | null,
  firstName: string,
  lastName: string,
  phone: string,
  password: string
}

export type UserSignInParamsType = Omit<UserParamsType, 'firstName' | 'lastName' | 'avatar'>

export type UserType = {
  id: number;
  avatar: string | null,
  firstName: string,
  lastName: string,
  phone: string,
  password: string,
  status: 'Active' | 'Deactivate',
}

export type UserResponseType = {
  user: UserType;
  token: string;
}