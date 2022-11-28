import { NextFunction, Request, Response } from "express";
import AuthHandler from "../auth/AuthHandler";

const checkAuth = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  req.tokenData = AuthHandler.validateToken(authorization || "");
  next();
};

export default checkAuth;
