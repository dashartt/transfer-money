import { PrismaClient } from "@prisma/client";
import { TransactionOutput, TransferOutput } from "../types/TransactionTypes";

class TransactionModel {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async registerTransfer(data: TransferOutput) {
    await this.prisma.transaction.create({
      data: {
        creditedAccountId: data.creditedAccountId,
        ...(data.debitedAccountId && {
          debitedAccountId: data.debitedAccountId,
        }),
        value: data.value,
        createdAt: new Date(),
      },
    });
  }

  async getTransactionHistory(accountId: number) {
    const transactionHistory = (await this.prisma.$queryRaw`    
      SELECT DISTINCT us1.username as 'creditedAccount', us2.username as 'debitedAccount', tr.value as 'inCome', tr.createdAt as 'datetime'
      FROM Transaction as tr
      INNER JOIN Account as acc
      ON acc.id = tr.creditedAccountId OR acc.id = tr.debitedAccountId
      INNER JOIN User as us1
      ON us1.accountId = tr.creditedAccountId
      LEFT JOIN User as us2
      ON us2.accountId = tr.debitedAccountId
      WHERE ${accountId} = tr.creditedAccountId OR ${accountId} = tr.debitedAccountId
    `) as TransactionOutput[];

    return transactionHistory;
  }
}

export default TransactionModel;
