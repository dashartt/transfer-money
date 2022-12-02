export type TransferRequestDTO = {
  debitedAccount: string;
  creditedAccount: string;
  value: number;
};

export type AuthRequestDTO = {
  username: string | undefined;
  password: string | undefined;
};

export type AuthedUserDTO = {
  username: string;
  token: string;
  balance: number;
};

export type DepositDTO = {
  amount: number;
};
