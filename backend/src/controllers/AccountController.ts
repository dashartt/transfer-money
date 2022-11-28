import { NextFunction, Request, Response } from "express";
import AccountService from "../services/AccountService";
import {
  AccountsIdsForTransfer,
  TransferInput,
} from "../types/TransactionTypes";

class AccountController {
  private service;

  constructor() {
    this.service = new AccountService();
  }

  async getAccountIdsToTransfer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { creditedAccount, debitedAccount } = req.body as TransferInput;

    const responseOutput = await this.service.getAccountIdsToTransfer({
      creditedAccount,
      debitedAccount,
    });
    console.log(responseOutput.fail);

    if (responseOutput.fail) {
      return next(responseOutput.fail);
    }

    req.accountsIdsForTransfer = responseOutput.success
      ?.data as AccountsIdsForTransfer;

    next();
  }

  async validateBalance(req: Request, res: Response, next: NextFunction) {
    const { debitedAccountId } =
      req.accountsIdsForTransfer as AccountsIdsForTransfer;
    const { value } = req.body as TransferInput;

    const responseOutput = await this.service.validateBalance(
      debitedAccountId,
      value
    );

    console.log(responseOutput.fail);

    if (responseOutput.fail) {
      return next(responseOutput.fail);
    }

    next();
  }

  async makeTransfer(req: Request, res: Response, next: NextFunction) {
    const { debitedAccountId, creditedAccountId } =
      req.accountsIdsForTransfer as AccountsIdsForTransfer;
    const { value } = req.body as TransferInput;

    await this.service.makeTransfer({
      creditedAccountId,
      debitedAccountId,
      value,
    });

    next();
  }
}

export default AccountController;
