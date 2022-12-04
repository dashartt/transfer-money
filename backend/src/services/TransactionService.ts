import { transactionSchema } from "../config/zodSchemas";
import TransactionModel from "../models/TransactionModel";
import { FailInService, ServiceOutput } from "../types/ServerTypes";
import { TransferOutput } from "../types/TransactionTypes";
import { formatTransactionHistory } from "../utils/formatDataFromDb";

class TransactionService {
  private transactionModel;

  constructor() {
    this.transactionModel = new TransactionModel();
  }

  async registerTransfer({
    creditedAccountId,
    debitedAccountId = undefined,
    value,
  }: TransferOutput) {
    const serviceOutput = this.validateData({
      debitedAccountId,
      creditedAccountId,
      value,
    });

    if (serviceOutput?.fail) return serviceOutput;

    await this.transactionModel.registerTransfer({
      debitedAccountId,
      creditedAccountId,
      value,
    });
  }

  async getTransactionHistory(accountId: number) {
    const transactionHistory =
      await this.transactionModel.getTransactionHistory(accountId);

    return formatTransactionHistory(transactionHistory);
  }

  validateData(data: TransferOutput) {
    const parsed = transactionSchema.safeParse(data);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((error) => error.message);
      return {
        fail: {
          message: `400|${errors}`,
        },
      } as ServiceOutput<undefined, FailInService>;
    }
  }
}

export default TransactionService;
