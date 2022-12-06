import { NextFunction, Request, Response } from "express";

import * as serverMock from "../../mocks/serverMocks";
import * as userMock from "../../mocks/userMock";

import UserService from "../../../src/services/UserService";
import UserModel from "../../../src/models/UserModel";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

describe("User service test", () => {
  const userService = new UserService();

  describe("register test", () => {
    it("should call userModel register", async () => {
      // arrange
      jest.spyOn(UserModel.prototype, "searchByUser").mockResolvedValue(null);
      jest.spyOn(UserModel.prototype, "register").mockReturnThis();

      // act
      const userModel = new UserModel();
      await userService.register(userMock.userRegisterOutput);

      // assert
      expect(userModel.register).toHaveBeenCalledWith(
        userMock.userRegisterOutput
      );
    });

    it("should return error because a user already registered", async () => {
      // arrange
      jest
        .spyOn(UserModel.prototype, "searchByUser")
        .mockResolvedValue(userMock.userRegisterOutput);
      // act
      const serviceOutput = await userService.register(
        userMock.userRegisterOutput
      );
      // assert
      expect(serviceOutput).toEqual(serverMock.invalidRegisterServiceOutput);
    });
  });

  describe("login test", () => {
    it("shoul return token and username", async () => {
      // arrange
      jest
        .spyOn(UserModel.prototype, "login")
        .mockResolvedValue(userMock.userRegisterOutput);
      jest.spyOn(bcrypt, "compare").mockImplementation(() => true);
      jest.spyOn(jsonwebtoken, "sign").mockReturnThis();

      // act
      const serviceOutput = await userService.login(
        userMock.userRegisterOutput
      );

      // assert
      expect(serviceOutput.success!.data).toHaveProperty("token");
      expect(serviceOutput.success!.data).toHaveProperty("username");
    });

    it("should return error", async () => {
      // arrange
      jest.spyOn(UserModel.prototype, "login").mockResolvedValue(null);
      // act
      const serviceOutput = await userService.register(
        userMock.userRegisterOutput
      );
      // assert
      expect(serviceOutput).toEqual(serverMock.invalidRegisterServiceOutput);
    });
  });
});
