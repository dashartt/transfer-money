import { NextFunction, Request, Response } from "express";

import * as serverMock from "../../mocks/serverMocks";
import * as transferMock from "../../mocks/transactionMocks";
import TransactionController from "../../../src/controllers/TransactionController";
import TransactionService from "../../../src/services/TransactionService";

describe("Transaction controller test", () => {
  const transactionController = new TransactionController();

  let res: Response;
  let req: Request;
  let next: NextFunction;

  describe("registerTransfer test", () => {
    it("should return 200 and 'Successful transfer' message", async () => {
      // arrange
      jest
        .spyOn(TransactionService.prototype, "registerTransfer")
        .mockResolvedValue({});
      req = {
        body: {
          value: 100,
        },
        accountsIdsForTransfer: transferMock.accountIdsToTransfer,
      } as unknown as Request;

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // act
      await transactionController.registerTransfer(req, res, next);

      // assert
      const { status, message } = serverMock.transaferResponse;
      expect(res.status).toBeCalledWith(status);
      expect(res.json).toBeCalledWith({ message });
    });

    it("should fail registerTransfer service and call error middleware", async () => {
      // arrange
      jest
        .spyOn(TransactionService.prototype, "registerTransfer")
        .mockResolvedValue({
          fail: transferMock.invalidTransferOutput,
        });

      req = {
        body: {
          value: 100,
        },
        accountsIdsForTransfer: transferMock.accountIdsToTransfer,
      } as unknown as Request;

      next = jest.fn().mockReturnThis();

      // act
      await transactionController.registerTransfer(req, res, next);

      // assert
      expect(next).toHaveBeenCalledWith(transferMock.invalidTransferOutput);
    });
  });

  describe("getTransactionHistory test", () => {
    it("should return 200 and transaction history in array", async () => {
      // arrange
      jest
        .spyOn(TransactionService.prototype, "getTransactionHistory")
        .mockResolvedValue([]);

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // act
      await transactionController.getTransactionHistory(req, res, next);

      // assert
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith([]);
    });
  });
});
