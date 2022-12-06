import { TransferOutput } from "../../src/types/TransactionTypes";

export const accountIdsToTransfer = {
  creditedAccountId: 0,
  debitedAccountId: 1,
};

export const transferDetails = {
  ...accountIdsToTransfer,
  value: 100,
} as TransferOutput;
