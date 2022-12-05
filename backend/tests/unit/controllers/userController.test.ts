import { NextFunction, Request, Response } from "express";

import UserController from "../../../src/controllers/UserController";
import UserService from "../../../src/services/UserService";
import * as userMock from "../../mocks/userMock";
import * as serverMock from "../../mocks/serverMocks";
import * as serviceMock from "../../mocks/serviceMocks";

describe("User controller test", () => {
  const userController = new UserController();
  const userService = new UserService();
  let res: Response;
  let req: Request;
  let next: NextFunction;

  describe("Auth test", () => {
    afterEach(() => jest.restoreAllMocks());

    it("should redirect to register controller", async () => {
      jest.spyOn(UserService.prototype, "validateData").mockReturnValue({});
      jest.spyOn(UserController.prototype, "register").mockResolvedValue();

      req = {
        query: {
          option: "register",
        },
      } as unknown as Request;

      await userController.auth(req, res, next);

      expect(userController.register).toHaveBeenCalled();
    });

    it("should redirect to login controller", async () => {
      jest.spyOn(UserService.prototype, "validateData").mockReturnValue({});
      jest.spyOn(UserController.prototype, "login").mockResolvedValue();

      req = {
        query: {
          option: "login",
        },
      } as unknown as Request;

      await userController.auth(req, res, next);

      expect(userController.login).toHaveBeenCalled();
    });
  });

  describe("Register test", () => {
    afterEach(() => jest.restoreAllMocks());

    it("should return 201 and registered user message", async () => {
      // arrange
      jest.spyOn(UserService.prototype, "register").mockResolvedValue({});

      req = { body: userMock.validUser } as unknown as Request;
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // act
      await userController.register(req, res, next);

      // assert
      const { status, message } = serverMock.registeredUserResponse;
      expect(res.status).toBeCalledWith(status);
      expect(res.json).toBeCalledWith({ message });
    });
  });

  describe("Login test", () => {
    afterEach(() => jest.restoreAllMocks());

    it("should authenticate user and if successful, move on to the next middleware", async () => {
      // arrange
      jest.spyOn(UserService.prototype, "login").mockResolvedValue({
        success: { data: serviceMock.loginServiceResponse },
      });

      req = { body: userMock.validUser } as unknown as Request;
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
      next = jest.fn();

      // act
      await userController.login(req, res, next);

      // assert
      expect(next).toHaveBeenCalled();
    });
    it("should return 200 and authenticated user data in json", async () => {
      // arrange
      req = {
        accountDetails: serverMock.accountDetailsRequestKey,
        loginSuccessData: serverMock.loginSuccessRequestKey,
      } as unknown as Request;

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // act
      await userController.afterLogin(req, res);

      // assert
      const { status, ...jsonData } = serverMock.loginSucessUserResponse;
      expect(res.status).toBeCalledWith(status);
      expect(res.json).toBeCalledWith({ ...jsonData });
    });
  });
});
