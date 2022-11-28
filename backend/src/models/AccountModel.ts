import { PrismaClient } from "@prisma/client";
import { TransferOutput } from "../types/TransactionTypes";

export interface Account {
  id?: number;
  balance: number;
}

class AccountModel {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createAccount() {
    const account = await this.prisma.account.create({
      data: {
        balance: 0.0,
      },
    });

    return account.id;
  }

  async getAccountId(username: string) {
    const accountId = await this.prisma.account.findFirst({
      where: {
        user: {
          username,
        },
      },
      select: {
        id: true,
      },
    });

    return accountId;
  }

  async validateCreditedAccount(creditedAccountId: number) {
    const accountFound = await this.prisma.account.findFirst({
      where: {
        id: creditedAccountId,
      },
    });

    return accountFound;
  }

  async getBalance(accountId: number) {
    const account = await this.prisma.account.findFirst({
      where: {
        id: accountId,
      },
      select: {
        balance: true,
      },
    });

    return account?.balance || 0;
  }

  async updateBalance(accountId: number, value: number) {
    await this.prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        balance: value,
      },
    });
  }

  async makeTransfer(data: TransferOutput) {
    const balanceBeforeCredit = await this.getBalance(data.creditedAccountId);
    const balanceBeforeDebit = await this.getBalance(data.debitedAccountId);

    await this.updateBalance(
      data.creditedAccountId,
      balanceBeforeCredit + data.value
    );

    await this.updateBalance(
      data.debitedAccountId,
      balanceBeforeDebit - data.value
    );
  }
}

export default AccountModel;
