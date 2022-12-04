import { PrismaClient } from "@prisma/client";
import { DepositInput } from "../types/AccountTypes";
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

  async getAccountDetails(username: string) {
    const accountId = await this.prisma.account.findFirst({
      where: {
        user: {
          username,
        },
      },
      select: {
        id: true,
        balance: true,
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

  async makeDeposit({ value, accountId }: DepositInput) {
    const balanceBeforeDeposit = await this.getBalance(accountId);
    const balanceAfterDeposit = balanceBeforeDeposit + value;

    await this.updateBalance(accountId, balanceAfterDeposit);
    return balanceAfterDeposit;
  }

  async makeTransfer({
    creditedAccountId,
    debitedAccountId,
    value,
  }: TransferOutput) {
    const balanceBeforeCredit = await this.getBalance(creditedAccountId);
    const balanceBeforeDebit = await this.getBalance(debitedAccountId!);

    await this.updateBalance(creditedAccountId, balanceBeforeCredit + value);

    await this.updateBalance(debitedAccountId!, balanceBeforeDebit - value);
  }
}

export default AccountModel;
