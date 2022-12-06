import { UserCredentials } from "../../src/types/UserTypes";

export const validUsername = "dashartx" as string;
export const invalidUsername = "das" as string;

export const validPassword = "12345678" as string;
export const invalidPassword = "1234" as string;

export const validUser = {
  username: validUsername,
  password: validPassword,
} as UserCredentials;

export const userWithInvalidPassword = {
  username: validUsername,
  password: invalidPassword,
} as UserCredentials;

export const userWithInvalidUsername = {
  username: invalidPassword,
  password: validUsername,
} as UserCredentials;

export const userRegisterOutput = {
  ...validUser,
  accountId: 1,
  id: 1,
};
