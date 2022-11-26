import { NextFunction, Request, Response, Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.post("/auth", (req: Request, res: Response, next: NextFunction) =>
  userController.auth(req, res, next)
);

export default router;
