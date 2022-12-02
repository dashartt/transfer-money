export type AccountDetails = {
  balance: number;
  username: string;
  accountId?: number;
};

export type DepositInput = {
  username: string;
  amount: number;
};

export type DepositOutput = {
  accountId: number;
  amount: number;
};
