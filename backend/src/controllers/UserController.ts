import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import { AccountDetails } from "../types/AccountTypes";
import { LoginSuccessNext } from "../types/ServerTypes";

class UserController {
  private service;

  constructor() {
    this.service = new UserService();
  }

  async auth(req: Request, res: Response, next: NextFunction) {
    const authOption = req.query?.option as string;

    const serviceOutput = this.service.validateData(req.body);

    if (serviceOutput.fail) return next(serviceOutput.fail);

    if (authOption === "register") {
      await this.register(req, res, next);
    } else {
      await this.login(req, res, next);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const serviceOutput = await this.service.login(req.body);

    if (serviceOutput.fail) return next(serviceOutput.fail);

    req.loginSuccessData = serviceOutput.success!.data as LoginSuccessNext;

    next();
  }

  async afterLogin(req: Request, res: Response) {
    const { balance } = req.accountDetails as AccountDetails;
    const { token, username } = req.loginSuccessData as LoginSuccessNext;

    return res.status(200).json({
      username,
      token,
      balance,
      message: "User authenticated successfully",
    });
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const serviceOutput = await this.service.register(req.body);

    if (serviceOutput?.fail) return next(serviceOutput.fail);

    return res.status(201).json({
      message:
        "Account created successfully. Login with your account to proceed",
    });
  }
}

export default UserController;
