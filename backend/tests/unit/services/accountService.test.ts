import { NextFunction, Request, Response } from "express";

import * as serverMock from "../../mocks/serverMocks";
import * as accountMock from "../../mocks/accountMocks";

import AccountService from "../../../src/services/AccountService";
import AccountModel from "../../../src/models/AccountModel";

describe("Account service test", () => {
  const accountService = new AccountService();

  describe("getAccountDetails test", () => {
    it("should return account details", async () => {
      // arrange
      const {
        username,
        balance,
        accountId: id = 0,
      } = accountMock.accountDetails;
      jest
        .spyOn(AccountModel.prototype, "getAccountDetails")
        .mockResolvedValue({ balance, id });
      // jest.spyOn(UserModel.prototype, "register").mockReturnThis();

      // act
      const serviceOutput = await accountService.getAccountDetails(username);

      // assert
      expect(serviceOutput.success?.data).toHaveProperty("id");
      expect(serviceOutput.success?.data).toHaveProperty("balance");
    });

    it("should return error ", async () => {
      // arrange
      jest
        .spyOn(AccountModel.prototype, "getAccountDetails")
        .mockResolvedValue(null);
      // act
      const serviceOutput = await accountService.getAccountDetails(
        accountMock.accountDetails.username
      );
      // assert
      expect(serviceOutput).toEqual(serverMock.invalidGetBalanceServiceOutput);
    });
  });

  describe("getAccountIdsToTransfer test", () => {
    it("should return debit and credit account ids", async () => {
      // arrange
      jest
        .spyOn(AccountModel.prototype, "getAccountDetails")
        .mockResolvedValueOnce({ balance: 100, id: 1 });
      jest
        .spyOn(AccountModel.prototype, "getAccountDetails")
        .mockResolvedValueOnce({ balance: 500, id: 2 });

      // act
      const serviceOutput = await accountService.getAccountIdsToTransfer({
        creditedAccount: "0",
        debitedAccount: "0",
      });

      // assert
      expect(serviceOutput.success?.data).toHaveProperty("debitedAccountId");
      expect(serviceOutput.success?.data).toHaveProperty("creditedAccountId");
    });

    it("should return error because both accounts not found", async () => {
      // arrange
      jest
        .spyOn(AccountModel.prototype, "getAccountDetails")
        .mockResolvedValueOnce(null);
      jest
        .spyOn(AccountModel.prototype, "getAccountDetails")
        .mockResolvedValueOnce(null);

      // act
      const serviceOutput = await accountService.getAccountIdsToTransfer({
        creditedAccount: "0",
        debitedAccount: "0",
      });

      // assert
      const { withBothInvaliAccountIds } =
        serverMock.invalidTransferServiceOutput;
      expect(serviceOutput.fail).toEqual(withBothInvaliAccountIds);
    });

    it("should return error because credit account not found", async () => {
      // arrange
      jest
        .spyOn(AccountModel.prototype, "getAccountDetails")
        .mockResolvedValueOnce(null);
      jest
        .spyOn(AccountModel.prototype, "getAccountDetails")
        .mockResolvedValueOnce({ id: 1, balance: 100 });

      // act
      const serviceOutput = await accountService.getAccountIdsToTransfer({
        creditedAccount: "",
        debitedAccount: "",
      });

      // assert
      const { withInvalidCreditAccountId } =
        serverMock.invalidTransferServiceOutput;
      expect(serviceOutput.fail).toEqual(withInvalidCreditAccountId);
    });

    it("should return error because debit account not found", async () => {
      // arrange
      jest
        .spyOn(AccountModel.prototype, "getAccountDetails")
        .mockResolvedValueOnce({ id: 1, balance: 100 });
      jest
        .spyOn(AccountModel.prototype, "getAccountDetails")
        .mockResolvedValueOnce(null);

      // act
      const serviceOutput = await accountService.getAccountIdsToTransfer({
        creditedAccount: "",
        debitedAccount: "",
      });

      // assert
      const { withInvalidDebitedAccountId } =
        serverMock.invalidTransferServiceOutput;
      expect(serviceOutput.fail).toEqual(withInvalidDebitedAccountId);
    });
  });

  describe("validateBalance test", () => {
    it("should return balance", async () => {
      // arrange
      jest.spyOn(AccountModel.prototype, "getBalance").mockResolvedValue(100);

      // act
      // validateBalance(accountId: number, amountTransfer: number)
      const serviceOutput = await accountService.validateBalance(1, 50);

      // assert
      expect(serviceOutput.success?.data).toEqual(100);
    });

    it("should return error", async () => {
      // arrange
      jest.spyOn(AccountModel.prototype, "getBalance").mockResolvedValue(0);

      // act
      const serviceOutput = await accountService.validateBalance(1, 100);

      // assert
      expect(serviceOutput.fail).toEqual(
        serverMock.invalidValidateBalanceServiceOutput
      );
    });
  });

  describe("makeDeposit test", () => {
    it("should return balance after deposit", async () => {
      // arrange
      jest.spyOn(AccountService.prototype, "validateData").mockReturnValue({});
      jest.spyOn(AccountModel.prototype, "makeDeposit").mockResolvedValue(150);

      // act
      const serviceOutput = await accountService.makeDeposit({
        accountId: 1,
        value: 50,
      });

      // assert
      const balanceAfterDeposit = 150;
      expect(serviceOutput.success?.data).toEqual(balanceAfterDeposit);
    });

    it("should return error", async () => {
      // arrange
      jest
        .spyOn(AccountService.prototype, "validateData")
        .mockReturnValue(serverMock.invalidDepositServiceOutput);

      // act
      const serviceOutput = await accountService.makeDeposit({
        accountId: 1,
        value: 0,
      });

      // assert
      expect(serviceOutput.fail).toEqual(
        serverMock.invalidDepositServiceOutput.fail
      );
    });
  });

  describe("makeTransfer test", () => {
    it("should call accountModel makeTransfer", async () => {
      // arrange
      jest.spyOn(AccountModel.prototype, "makeTransfer").mockReturnThis();

      // act
      const accountModel = new AccountModel();
      const serviceOutput = await accountService.makeTransfer({
        creditedAccountId: 1,
        debitedAccountId: 2,
        value: 100,
      });

      // assert

      expect(accountModel.makeTransfer).toHaveBeenCalled();
    });
  });
});
