import { Router } from "express";
import UserController from "../controllers/UserController";
import TransactionController from "../controllers/TransactionController";
import checkAuth from "../middlewares/CheckAuth";
import AccountController from "../controllers/AccountController";

const router = Router();

// initialize controllers
const userController = new UserController();
const transactionController = new TransactionController();
const accountController = new AccountController();

// register and login endpoint
router.post(
  "/auth",
  userController.auth.bind(userController),
  accountController.getAccountDetails.bind(accountController),
  userController.afterLogin.bind(userController)
);

// deposit endpoint
router.patch(
  "/account/deposit",
  checkAuth,
  accountController.getAccountDetails.bind(accountController),
  accountController.makeDeposit.bind(accountController),
  transactionController.registerTransfer.bind(transactionController)
);

// transfer endpoint
router.post(
  "/transactions/transfer",
  checkAuth,
  accountController.getAccountIdsToTransfer.bind(accountController),
  accountController.validateBalance.bind(accountController),
  accountController.makeTransfer.bind(accountController),
  transactionController.registerTransfer.bind(transactionController)
);

// get transaction history endpoint
router.get(
  "/transactions/history",
  checkAuth,
  transactionController.getTransactionHistory.bind(transactionController)
);

export default router;
