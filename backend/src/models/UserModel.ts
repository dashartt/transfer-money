import { PrismaClient } from "@prisma/client";
import AccountModel from "./AccountModel";
import { hash, compare } from "bcryptjs";

export interface User {
  id?: number;
  username: string;
  password: string;
  accountId: number;
}

class UserModel {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async login(data: User) {
    const userFound = await this.searchByUser(data);
    const isValidPassword = await compare(
      data.password,
      userFound?.password || ""
    );

    if (!userFound || !isValidPassword) {
      throw new Error("400|Invalid username or password");
    }
  }

  async register(data: User) {
    const userFound = await this.searchByUser(data);

    if (userFound) {
      throw new Error("409|User already exists");
    }

    const accountId = await new AccountModel().createAccount();
    const hashPassword = await hash(data.password, 10);

    await this.prisma.user.create({
      data: {
        username: data.username,
        password: hashPassword,
        accountId: accountId,
      },
    });
  }

  async searchByUser(data: User) {
    const userFound = await this.prisma.user.findFirst({
      where: {
        username: data.username,
      },
    });

    return userFound;
  }
}

export default UserModel;