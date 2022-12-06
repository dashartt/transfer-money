import * as transferMock from "../../mocks/transactionMocks";

import TransactionService from "../../../src/services/TransactionService";
import TransactionModel from "../../../src/models/TransactionModel";

describe("Transaction service test", () => {
  const transactionService = new TransactionService();

  describe("registerTransfer test", () => {
    it("should call userModel registerTransfer", async () => {
      // arrange
      jest
        .spyOn(TransactionService.prototype, "validateData")
        .mockReturnValue({});

      jest
        .spyOn(TransactionModel.prototype, "registerTransfer")
        .mockReturnThis();

      // act
      const transactionModel = new TransactionModel();
      await transactionService.registerTransfer(transferMock.transferDetails);

      // assert
      expect(transactionModel.registerTransfer).toHaveBeenCalledWith(
        transferMock.transferDetails
      );
    });

    it("should return error", async () => {
      // arrange
      jest
        .spyOn(TransactionService.prototype, "validateData")
        .mockReturnValue({ fail: transferMock.invalidTransferOutput });
      // act
      const serviceOutput = await transactionService.registerTransfer(
        transferMock.transferDetails
      );
      // assert
      expect(serviceOutput?.fail).toEqual(transferMock.invalidTransferOutput);
    });
  });

  describe("getTransactionHistory test", () => {
    it("should call userModel registerTransfer", async () => {
      // arrange
      const accountId = 1;
      jest
        .spyOn(TransactionModel.prototype, "getTransactionHistory")
        .mockResolvedValue([]);

      // act
      const serviceOutput = await transactionService.getTransactionHistory(
        accountId
      );

      // assert
      expect(serviceOutput).toHaveLength(0);
    });
  });
});
