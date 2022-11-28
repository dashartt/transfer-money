import AccountModel from "../models/AccountModel";

import {
  FailInResponse,
  ResponseOutput,
  SuccessfulInResponse,
} from "../types/ResponseTypes";
import { AccountForTransfer, TransferOutput } from "../types/TransactionTypes";

class AccountService {
  private accountModel;

  constructor() {
    this.accountModel = new AccountModel();
  }

  async getAccountIdsToTransfer({
    creditedAccount,
    debitedAccount,
  }: AccountForTransfer) {
    const creditedAcc = await this.accountModel.getAccountId(creditedAccount);
    const debitedAcc = await this.accountModel.getAccountId(debitedAccount);

    if (!debitedAcc && !creditedAcc) {
      return {
        fail: {
          message: "404|Sender and recipient account not found ",
        },
      } as ResponseOutput<undefined, FailInResponse>;
    } else if (!debitedAcc) {
      return {
        fail: { message: "404|Recipient account not found" },
      } as ResponseOutput<undefined, FailInResponse>;
    } else if (!creditedAcc) {
      return {
        fail: { message: "404|Recipient account not found" },
      } as ResponseOutput<undefined, FailInResponse>;
    }

    return {
      success: {
        data: {
          debitedAccountId: debitedAcc?.id,
          creditedAccountId: creditedAcc?.id,
        },
      },
    } as ResponseOutput<SuccessfulInResponse, undefined>;
  }

  async validateBalance(accountId: number, transferAmount: number) {
    const balanceValue = await this.accountModel.getBalance(accountId);
    const canTransfer = transferAmount <= balanceValue;

    if (!canTransfer) {
      return {
        fail: { message: "409|Insufficient balance" },
      } as ResponseOutput<undefined, FailInResponse>;
    }

    return { success: { data: true } } as ResponseOutput<
      SuccessfulInResponse | undefined
    >;
  }

  async makeTransfer(data: TransferOutput) {
    await this.accountModel.makeTransfer(data);
  }
}

export default AccountService;
