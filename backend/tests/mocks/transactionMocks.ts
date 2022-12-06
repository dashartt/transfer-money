import { TransferOutput } from "../../src/types/TransactionTypes";

export const accountIdsToTransfer = {
  creditedAccountId: 0,
  debitedAccountId: 1,
};

export const transferDetails = {
  ...accountIdsToTransfer,
  value: 100,
} as TransferOutput;

export const invalidTransferOutput = {
  message: "400|[Invalid value, transfers above R$0.01 are valid]",
};
