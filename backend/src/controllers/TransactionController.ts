import { NextFunction, Request, Response } from "express";
import TransactionService from "../services/TransactionService";

class TransactionController {
  private transactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  async registerTransfer(req: Request, res: Response, next: NextFunction) {
    const hasError = await this.transactionService.registerTransfer(req.body);

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
