import AccountModel from "../models/AccountModel";
import { Transfer } from "../models/TransactionModel";

class AccountService {
  private accountModel;

  constructor() {
    this.accountModel = new AccountModel();
  }

  async validateCreditedAccount(id: number) {
    const accountFound = await this.accountModel.validateCreditedAccount(id);

    if (!accountFound) {
      return {
        message: "400|Account of the person who will receive is invalid",
      };
    }
  }

  async validateBalance(accountId: number, transferAmount: number) {
    const balanceValue = await this.accountModel.getBalance(accountId);
    const canTransfer = transferAmount <= balanceValue;

    if (!canTransfer) {
      return { message: "409|Insufficient balance" };
    }
  }

  async makeTransfer(data: Transfer) {
    await this.accountModel.makeTransfer(data);
  }
}

export default AccountService;
