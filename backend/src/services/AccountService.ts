import { depositSchema } from "../config/zodSchemas";
import AccountModel from "../models/AccountModel";
import { DepositInput } from "../types/AccountTypes";

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

  async getAccountDetails(username: string) {
    const accountDetails = await this.accountModel.getAccountDetails(username);

    if (!accountDetails) {
      return {
        fail: {
          message: "404|Account not found ",
        },
      } as ResponseOutput<undefined, FailInResponse>;
    }

    return {
      success: {
        data: accountDetails,
      },
    } as ResponseOutput<SuccessfulInResponse, undefined>;
  }

  async getAccountIdsToTransfer({
    creditedAccount,
    debitedAccount,
  }: AccountForTransfer) {
    const creditedAcc = await this.accountModel.getAccountDetails(
      creditedAccount
    );
    const debitedAcc = await this.accountModel.getAccountDetails(
      debitedAccount
    );

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

    return { success: { data: balanceValue } } as ResponseOutput<
      SuccessfulInResponse | undefined
    >;
  }

  async makeDeposit({ amount, username }: DepositInput) {
    const responseValidate = this.validateData({ amount, username });

    if (responseValidate.fail) {
      return responseValidate;
    }

    const responseAccountDetails = await this.getAccountDetails(username);

    if (responseAccountDetails.fail) {
      return responseAccountDetails;
    }

    const accountDetails = responseAccountDetails.success?.data as {
      id: number;
    };

    const balanceAfterDeposit = await this.accountModel.makeDeposit({
      amount,
      accountId: accountDetails.id,
    });

    return {
      success: {
        data: balanceAfterDeposit,
      },
    } as ResponseOutput<SuccessfulInResponse, undefined>;
  }

  async makeTransfer(data: TransferOutput) {
    await this.accountModel.makeTransfer(data);
  }

  validateData({ amount, username }: DepositInput) {
    const parsedDeposit = depositSchema.safeParse({ amount, username });

    if (!parsedDeposit.success) {
      const errors = parsedDeposit.error.issues.map((error) => error.message);
      return {
        fail: { message: `400|${errors}` },
      } as ResponseOutput<undefined, FailInResponse>;
    }

    return {
      success: {
        data: true,
      },
    } as ResponseOutput<SuccessfulInResponse, undefined>;
  }
}

export default AccountService;
