import { NextFunction, Request, Response } from "express";

import TransactionService from "../services/TransactionService";
import {
  AccountsIdsForTransfer,
  TransferInput,
} from "../types/TransactionTypes";

class TransactionController {
  private transactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  async registerTransfer(req: Request, res: Response, next: NextFunction) {
    const { creditedAccountId, debitedAccountId = undefined } =
      req.accountsIdsForTransfer as AccountsIdsForTransfer;

    const { value } = req.body as TransferInput;

    const serviceOutput = await this.transactionService.registerTransfer({
      creditedAccountId,
      debitedAccountId,
      value,
    });

    if (serviceOutput?.fail) return next(serviceOutput.fail);

    return res.status(200).json({ message: "Successful transfer" });
  }

  async getTransactionHistory(req: Request, res: Response, next: NextFunction) {
    const transactionHistory =
      await this.transactionService.getTransactionHistory(
        req.tokenData?.accountId || 0
      );

    return res.status(200).json(transactionHistory);
  }
}

export default TransactionController;
