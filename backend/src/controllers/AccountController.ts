import { NextFunction, Request, Response } from "express";
import AccountService from "../services/AccountService";
import { AccountDetails, DepositOutput } from "../types/AccountTypes";
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
    let username = req.tokenData?.username;

    if (!username) username = req.loginSuccessData!.username;

    const serviceOutput = await this.service.getAccountDetails(username);

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
      debitedAccountId!,
      value
    );

    if (responseOutput.fail) {
      return next(responseOutput.fail);
    }

    next();
  }

  async makeDeposit(req: Request, res: Response, next: NextFunction) {
    const value = req.body?.value || 0;
    const accountId = req.tokenData!.accountId;

    const serviceOutput = await this.service.makeDeposit({ value, accountId });

    if (serviceOutput.fail) {
      return next(serviceOutput.fail);
    }

    req.accountsIdsForTransfer = { creditedAccountId: accountId };

    const balance = serviceOutput.success!.data as number;
    req.depositOutput = { balance, accountId };

    next();
  }

  async afterDeposit(req: Request, res: Response, next: NextFunction) {
    const { balance } = req.depositOutput as DepositOutput;

    return res.status(200).json({
      balance,
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
