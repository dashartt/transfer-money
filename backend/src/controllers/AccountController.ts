import { NextFunction, Request, Response } from "express";
import AccountService from "../services/AccountService";
import { AccountDetails } from "../types/AccountTypes";
import { LoginSuccessNext } from "../types/ServerTypes";
import {
  AccountsIdsForTransfer,
  TransferInput,
} from "../types/TransactionTypes";

class AccountController {
  private service;

  constructor() {
    this.service = new AccountService();
  }

  async getBalance(req: Request, res: Response, next: NextFunction) {
    const username = req.params?.username || "";
    const accountDetails = (await this.service.getAccountDetails(
      username
    )) as AccountDetails;

    return res.status(200).json({
      balance: accountDetails.balance,
    });
  }

  async getAccountDetails(req: Request, res: Response, next: NextFunction) {
    const { token, username } = req.loginSuccessData as LoginSuccessNext;

    const serviceOutput = await this.service.getAccountDetails(username || "");

    if (serviceOutput.fail) return next(serviceOutput.fail);

    const { balance, accountId } = serviceOutput.success!
      .data as AccountDetails;

    req.accountDetails = { balance, accountId } as AccountDetails;

    next();
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

    if (responseOutput.fail) {
      return next(responseOutput.fail);
    }

    next();
  }

  async makeDeposit(req: Request, res: Response, next: NextFunction) {
    const amount = req.body?.amount || 0;

    const responseDeposit = await this.service.makeDeposit({
      amount,
      username: req?.tokenData?.username || "",
    });

    if (responseDeposit?.fail) {
      return next(responseDeposit.fail);
    }

    return res.status(200).json({
      balance: responseDeposit?.success?.data,
      message: "Successfully deposited",
    });
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
