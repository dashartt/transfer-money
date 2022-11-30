import { TransactionOutput } from "../types/TransactionTypes";
import formatDate from "./formatDate";

export const formatTransactionHistory = (data: TransactionOutput[]) =>
  data.map(({ datetime, ...transaction }) => ({
    ...transaction,
    date: formatDate(datetime),
  }));
