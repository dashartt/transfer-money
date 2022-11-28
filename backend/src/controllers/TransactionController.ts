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
    const { creditedAccountId, debitedAccountId } =
      req.accountsIdsForTransfer as AccountsIdsForTransfer;
    const { value } = req.body as TransferInput;

    const hasError = await this.transactionService.registerTransfer({
      creditedAccountId,
      debitedAccountId,
      value,
    });

    if (hasError) return next(hasError);

    return res.status(200).json({ message: "Successful transfer" });
  }

  async getTransactionHistory(req: Request, res: Response, next: NextFunction) {
    const transactionHistory =
      await this.transactionService.getTransactionHistory(
        Number(req.params.id)
      );

    return res.status(200).json({ data: transactionHistory });
  }
}

export default TransactionController;
