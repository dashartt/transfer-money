import { PrismaClient } from "@prisma/client";
import AccountModel from "./AccountModel";
import { hash, compare } from "bcryptjs";
import { UserModelAttrs } from "../types/UserTypes";

class UserModel {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async login(data: UserModelAttrs) {
    const userFound = await this.searchByUser(data.username);
    const isValidPassword = await compare(
      data.password,
      userFound?.password || ""
    );

    if (!userFound || !isValidPassword) {
      throw new Error("400|Invalid username or password");
    }

    return userFound;
  }

  async register(data: UserModelAttrs) {
    const userFound = await this.searchByUser(data.username);

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

  async searchByUser(username: string) {
    const userFound = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    return userFound;
  }
}

export default UserModel;
