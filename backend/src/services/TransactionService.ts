import { transactionSchema } from "../config/zodSchemas";
import TransactionModel from "../models/TransactionModel";
import { TransferOutput } from "../types/TransactionTypes";

class TransactionService {
  private transactionModel;

  constructor() {
    this.transactionModel = new TransactionModel();
  }

  async registerTransfer({
    creditedAccountId,
    debitedAccountId,
    value,
  }: TransferOutput) {
    const hasErrorData = this.validateData({
      debitedAccountId,
      creditedAccountId,
      value,
    });

    if (hasErrorData) return hasErrorData;

    await this.transactionModel.registerTransfer({
      debitedAccountId,
      creditedAccountId,
      value,
    });
  }

  async getTransactionHistory(accountId: number) {
    const transactionHistory =
      await this.transactionModel.getTransactionHistory(accountId);

    return transactionHistory;
  }

  validateData(data: TransferOutput) {
    const parsed = transactionSchema.safeParse(data);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((error) => error.message);
      const errorMessage = { message: `400|${errors}` };
      return errorMessage;
    }
  }
}

export default TransactionService;
