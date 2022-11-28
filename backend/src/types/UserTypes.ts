export interface UserDTO {
  id?: number;
  username: string;
  password: string;
  accountId: number;
}

export interface UserResponseOutput {
  token: string;
  username: string;
  balance?: number;
}
