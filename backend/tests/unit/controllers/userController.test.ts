import { NextFunction, Request, Response } from "express";

import UserController from "../../../src/controllers/UserController";
import UserService from "../../../src/services/UserService";
import * as userMock from "../../mocks/userMock";
import * as responseMock from "../../mocks/responseMocks";
import * as serviceMock from "../../mocks/serviceMocks";
import * as accountMock from "../../mocks/accountMocks";
import AccountService from "../../../src/services/AccountService";

describe("User controller test", () => {
  const userController = new UserController();
  const userService = new UserService();
  let res: Response;
  let req: Request;
  let next: NextFunction;

  describe("register test", () => {
    it("should return 201 and registered user message", async () => {
      // arrange
      jest
        .spyOn(UserService.prototype, "register")
        .mockResolvedValueOnce({ success: { data: true } });

      req = { body: userMock.validUser } as unknown as Request;
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // act
      await userController.register(req, res);

      // assert
      const { status, message } = responseMock.registeredUserResponse;
      expect(res.status).toBeCalledWith(status);
      expect(res.json).toBeCalledWith({ message });
    });
  });

  describe("Login test", () => {
    it("should return 200 and authenticated user data in json", async () => {
      // arrange
      jest
        .spyOn(AccountService.prototype, "getAccountDetails")
        .mockResolvedValueOnce({
          success: { data: accountMock.accountDetails },
        });
      jest.spyOn(UserService.prototype, "login").mockResolvedValueOnce({
        success: { data: serviceMock.loginServiceResponse },
      });

      req = { body: userMock.validUser } as unknown as Request;
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // act
      await userController.login(req, res, next);

      // assert
      const { status, ...data } = responseMock.authenticatedUserResponse;
      expect(res.status).toBeCalledWith(status);
      expect(res.json).toBeCalledWith({ ...data });
    });
  });
});
