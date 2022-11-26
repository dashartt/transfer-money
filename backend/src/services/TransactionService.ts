import { transactionSchema } from "../config/zodSchemas";
import TransactionModel, { Transaction } from "../models/TransactionModel";
import AccountService from "./AccountService";

class TransactionService {
  private transactionModel;

  constructor() {
    this.transactionModel = new TransactionModel();
  }

  async registerTransfer(data: Transaction) {
    const hasErrorData = this.validateData(data);
    if (hasErrorData) return hasErrorData;

    const accountService = new AccountService();
    const hasErrorAccount = await accountService.validateCreditedAccount(
      data.creditedAccountId
    );
    if (hasErrorAccount) return hasErrorAccount;

    const hasErrorBalance = await accountService.validateBalance(
      data.debitedAccountId,
      data.value
    );
    if (hasErrorBalance) return hasErrorBalance;

    await accountService.makeTransfer({
      creditedAccountId: data.creditedAccountId,
      debitedAccountId: data.debitedAccountId,
      value: data.value,
    });

    await this.transactionModel.registerTransfer(data);
  }

  async getTransactionHistory(accountId: number) {
    const transactionHistory =
      await this.transactionModel.getTransactionHistory(accountId);
    return transactionHistory;
  }

  validateData(data: Transaction) {
    const parsed = transactionSchema.safeParse(data);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((error) => error.message);
      const errorMessage = { message: `400|${errors}` };
      return errorMessage;
    }
  }
}

export default TransactionService;
