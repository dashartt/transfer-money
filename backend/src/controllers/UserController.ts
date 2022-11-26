import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  private service;

  constructor() {
    this.service = new UserService();
  }

  async auth(req: Request, res: Response, next: NextFunction) {
    const authOption = req.query?.option as string;
    const hasError = this.service.validateData(req.body);

    if (hasError) return next(hasError);

    if (authOption === "register") {
      await this.register(req, res);
    } else {
      await this.login(req, res);
    }
  }

  async login(req: Request, res: Response) {
    await this.service.login(req.body);
    return res.status(200).end();
  }

  async register(req: Request, res: Response) {
    await this.service.register(req.body);
    return res.status(201).end();
  }
}

export default UserController;
