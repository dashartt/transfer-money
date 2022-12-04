export type AccountDetails = {
  balance: number;
  username: string;
  accountId?: number;
};

export type DepositInput = {
  accountId: number;
  value: number;
};

export type DepositOutput = {
  accountId: number;
  balance: number;
};
