import { NextFunction, Request, Response } from "express";
import AccountService from "../services/AccountService";
import UserService from "../services/UserService";
import { UserResponseOutput } from "../types/UserTypes";

class UserController {
  private service;

  constructor() {
    this.service = new UserService();
  }

  async auth(req: Request, res: Response, next: NextFunction) {
    const authOption = req.query?.option as string;
    const responseOutput = this.service.validateData(req.body);

    if (responseOutput.fail) return next(responseOutput.fail);

    if (authOption === "register") {
      await this.register(req, res);
    } else {
      await this.login(req, res, next);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const userResponseOutput = await this.service.login(req.body);

    const { token, username } = userResponseOutput.success
      ?.data as UserResponseOutput;

    const accountResponseOutput = await new AccountService().getAccountDetails(
      username
    );

    if (accountResponseOutput.fail) return next(accountResponseOutput.fail);
    const { balance } = accountResponseOutput.success
      ?.data as UserResponseOutput;

    return res.status(200).json({
      token,
      username,
      balance,
      message: "User authenticated successfully",
    });
  }

  async register(req: Request, res: Response) {
    await this.service.register(req.body);
    return res.status(201).json({
      message:
        "Account created successfully. Login with your account to proceed",
    });
  }
}

export default UserController;
