export type TransferRequestDTO = {
  ownerDebitedAccount: string;
  ownerCreditedAccount: string;
  value: number;
};

export type AuthRequestDTO = {
  username: string | undefined;
  password: string | undefined;
};

export type AuthedUserDTO = {
  username: string;
  token: string;
};
