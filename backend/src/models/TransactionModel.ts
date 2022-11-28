import { PrismaClient } from "@prisma/client";
import { TransferOutput } from "../types/TransactionTypes";

class TransactionModel {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async registerTransfer(data: TransferOutput) {
    await this.prisma.transaction.create({
      data: {
        creditedAccountId: data.creditedAccountId,
        debitedAccountId: data.debitedAccountId,
        value: data.value,
        createdAt: new Date(),
      },
    });
  }

  async getTransactionHistory(accountId: number) {
    const transactionHistory = await this.prisma.transaction.findMany({
      where: {
        OR: [
          {
            debitedAccountId: accountId,
          },
          {
            creditedAccountId: accountId,
          },
        ],
      },
    });

    return transactionHistory;
  }
}

export default TransactionModel;
