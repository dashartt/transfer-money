import { NextFunction, Request, Response } from "express";

import * as serverMock from "../../mocks/serverMocks";
import * as transferMock from "../../mocks/transactionMocks";
import * as accountMock from "../../mocks/accountMocks";
import AccountController from "../../../src/controllers/AccountController";
import AccountService from "../../../src/services/AccountService";

describe("Account controller test", () => {
  const accountController = new AccountController();
  let res: Response;
  let req: Request;
  let next: NextFunction;

  describe("balance test", () => {
    describe("getBalance test", () => {
      it("should return 200 and balance in json", async () => {
        // arrange
        jest
          .spyOn(AccountService.prototype, "getAccountDetails")
          .mockResolvedValue({
            success: { data: accountMock.accountDetails },
          });
        req = {
          params: {
            username: "dashartx",
          },
        } as unknown as Request;

        res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as unknown as Response;

        // act
        await accountController.getBalance(req, res, next);

        // assert
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({
          balance: accountMock.accountDetails.balance,
        });
      });

      it("should fail getAccountDetails and call error middleware", async () => {
        // arrange
        jest
          .spyOn(AccountService.prototype, "getAccountDetails")
          .mockResolvedValue(serverMock.invalidGetBalanceServiceOutput);
        req = {
          params: {
            username: "dashartxx",
          },
        } as unknown as Request;

        next = jest.fn().mockReturnThis();

        // act
        await accountController.getBalance(req, res, next);

        // assert
        expect(next).toHaveBeenCalledWith(
          serverMock.invalidGetBalanceServiceOutput.fail
        );
      });
    });

    describe("getAccountDetails test", () => {
      it("should success getAccountDetails service and move on to the next middleware", async () => {
        // arrange
        jest
          .spyOn(AccountService.prototype, "getAccountDetails")
          .mockResolvedValue({ success: { data: accountMock.accountDetails } });
        req = {
          tokenData: accountMock.accountDetails,
        } as unknown as Request;

        next = jest.fn().mockReturnThis();

        // act
        await accountController.getAccountDetails(req, res, next);

        // assert
        expect(next).toHaveBeenCalled();
      });

      it("should fail getAccountDetails service and call error middleware", async () => {
        // arrange
        jest
          .spyOn(AccountService.prototype, "getAccountDetails")
          .mockResolvedValue(serverMock.invalidGetBalanceServiceOutput);
        req = {
          tokenData: accountMock.accountDetails,
        } as unknown as Request;

        next = jest.fn().mockReturnThis();

        // act
        await accountController.getAccountDetails(req, res, next);

        // assert
        expect(next).toHaveBeenCalled();
      });
    });

    describe("getAccountIdsToTransfer test", () => {
      it("should success getAccountIdsToTransfer service and move on to the next middleware", async () => {
        // arrange
        jest
          .spyOn(AccountService.prototype, "getAccountIdsToTransfer")
          .mockResolvedValue({
            success: { data: transferMock.transferDetails },
          });

        req = { body: transferMock.transferDetails } as unknown as Request;

        next = jest.fn().mockReturnThis();

        // act
        await accountController.getAccountIdsToTransfer(req, res, next);

        // assert
        expect(next).toHaveBeenCalled();
      });

      it("should fail getAccountIdsToTransfer service and call error middleware | invalid credit account", async () => {
        // arrange
        jest
          .spyOn(AccountService.prototype, "getAccountIdsToTransfer")
          .mockResolvedValue({
            fail: serverMock.invalidTransferServiceOutput
              .withInvalidCreditAccountId,
          });

        req = { body: transferMock.transferDetails } as unknown as Request;

        next = jest.fn().mockReturnThis();

        // act
        await accountController.getAccountIdsToTransfer(req, res, next);

        // assert
        expect(next).toHaveBeenCalledWith(
          serverMock.invalidTransferServiceOutput.withInvalidCreditAccountId
        );
      });

      it("should fail getAccountIdsToTransfer service and call error middleware | invalid debit account", async () => {
        // arrange
        jest
          .spyOn(AccountService.prototype, "getAccountIdsToTransfer")
          .mockResolvedValue({
            fail: serverMock.invalidTransferServiceOutput
              .withInvalidDebitedAccountId,
          });

        req = { body: transferMock.transferDetails } as unknown as Request;

        next = jest.fn().mockReturnThis();

        // act
        await accountController.getAccountIdsToTransfer(req, res, next);

        // assert
        expect(next).toHaveBeenCalledWith(
          serverMock.invalidTransferServiceOutput.withInvalidDebitedAccountId
        );
      });

      it("should fail getAccountIdsToTransfer service and call error middleware | both invalid accounts", async () => {
        // arrange
        jest
          .spyOn(AccountService.prototype, "getAccountIdsToTransfer")
          .mockResolvedValue({
            fail: serverMock.invalidTransferServiceOutput
              .withBothInvaliAccountIds,
          });

        req = { body: transferMock.transferDetails } as unknown as Request;

        next = jest.fn().mockReturnThis();

        // act
        await accountController.getAccountIdsToTransfer(req, res, next);

        // assert
        expect(next).toHaveBeenCalledWith(
          serverMock.invalidTransferServiceOutput.withBothInvaliAccountIds
        );
      });
    });

    describe("validateBalance test", () => {
      it("should success validateBalance service and move on to the next middleware", async () => {
        // arrange
        jest
          .spyOn(AccountService.prototype, "validateBalance")
          .mockResolvedValue({
            success: { data: transferMock.transferDetails },
          });

        req = {
          accountsIdsForTransfer: transferMock.accountIdsToTransfer,
          body: {
            value: transferMock.transferDetails.value,
          },
        } as unknown as Request;

        next = jest.fn();

        // act
        await accountController.validateBalance(req, res, next);

        // assert
        expect(next).toHaveBeenCalled();
      });

      it("should fail validateBalance service and call error middleware", async () => {
        // arrange
        jest
          .spyOn(AccountService.prototype, "validateBalance")
          .mockResolvedValue({
            fail: serverMock.invalidValidateBalanceServiceOutput,
          });

        req = {
          accountsIdsForTransfer: transferMock.accountIdsToTransfer,
          body: {
            value: transferMock.transferDetails.value,
          },
        } as unknown as Request;

        next = jest.fn().mockReturnThis();

        // act
        await accountController.validateBalance(req, res, next);

        // assert
        expect(next).toHaveBeenCalledWith(
          serverMock.invalidValidateBalanceServiceOutput
        );
      });
    });

    describe("makeDeposit test", () => {
      it("should success makeDeposit service and move on to the next middleware", async () => {
        // arrange
        jest.spyOn(AccountService.prototype, "makeDeposit").mockResolvedValue({
          success: { data: 200 },
        });

        req = {
          tokenData: { accountId: 1 },
          body: {
            value: 100,
          },
        } as unknown as Request;

        next = jest.fn();

        // act
        await accountController.makeDeposit(req, res, next);

        // assert
        expect(next).toHaveBeenCalled();
      });

      it("should fail makeDeposit service and call error middleware", async () => {
        // arrange
        jest.spyOn(AccountService.prototype, "makeDeposit").mockResolvedValue({
          fail: serverMock.invalidValidateBalanceServiceOutput,
        });

        req = {
          body: {
            value: 100,
          },
          tokenData: {
            accountId: 1,
          },
        } as unknown as Request;

        next = jest.fn().mockReturnThis();

        // act
        await accountController.makeDeposit(req, res, next);

        // assert
        expect(next).toHaveBeenCalledWith(
          serverMock.invalidValidateBalanceServiceOutput
        );
      });
    });

    describe("afterDeposit test", () => {
      it("should return 200 and deposit data in json", async () => {
        // arrange
        req = {
          depositOutput: {
            balance: 100,
          },
        } as unknown as Request;

        res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as unknown as Response;

        // act
        await accountController.afterDeposit(req, res, next);

        // assert
        const { status, ...jsonData } = serverMock.afterDepositResponse;
        expect(res.status).toBeCalledWith(status);
        expect(res.json).toBeCalledWith({ ...jsonData });
      });
    });

    describe("makeTransfer", () => {
      it("should success makeTransfer service and move on to the next middleware", async () => {
        // arrange
        jest
          .spyOn(AccountService.prototype, "makeTransfer")
          .mockResolvedValue();

        req = {
          accountsIdsForTransfer: transferMock.accountIdsToTransfer,
          body: {
            value: 100,
          },
        } as unknown as Request;

        next = jest.fn().mockReturnThis();

        // act
        await accountController.makeTransfer(req, res, next);

        // assert
        expect(next).toHaveBeenCalled();
      });
    });
  });
});
