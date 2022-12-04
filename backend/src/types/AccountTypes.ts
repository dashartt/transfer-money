export type AccountDetails = {
  balance: number;
  username: string;
  accountId?: number;
};

export type DepositOutput = {
  accountId: number;
  amount: number;
};
