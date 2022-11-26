import { PrismaClient } from "@prisma/client";

interface Account {
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
}

export default AccountModel;
