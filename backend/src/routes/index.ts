import { NextFunction, Request, Response, Router } from "express";
import UserController from "../controllers/UserController";
import TransactionController from "../controllers/TransactionController";

const router = Router();
const userController = new UserController();
const transactionController = new TransactionController();

router.post("/auth", (req: Request, res: Response, next: NextFunction) =>
  userController.auth(req, res, next)
);

router.post(
  "/transactions/transfer",
  (req: Request, res: Response, next: NextFunction) => {
    transactionController.registerTransfer(req, res, next);
  }
);

router.get(
  "/transactions/history/:id",
  (req: Request, res: Response, next: NextFunction) => {
    transactionController.getTransactionHistory(req, res, next);
  }
);

export default router;
