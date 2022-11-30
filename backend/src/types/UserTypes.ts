export type UserCredentials = {
  username: string;
  password: string;
};

export type UserModelAttrs = UserCredentials & {
  id?: number;
  accountId: number;
};

export type AuthedUserResponse = {
  token: string;
  username: string;
  balance: number;
  message: string;
};

export type UserToken = {
  accountId: number;
  username: string;
};
