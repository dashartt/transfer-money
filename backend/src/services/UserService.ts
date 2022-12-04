import { compare } from "bcryptjs";
import AuthHandler from "../auth/AuthHandler";
import { userSchema } from "../config/zodSchemas";
import UserModel from "../models/UserModel";
import {
  FailInResponse,
  ResponseOutput,
  SuccessfulInResponse,
} from "../types/ResponseTypes";
import { UserModelAttrs } from "../types/UserTypes";

class UserService {
  private userModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async register(data: UserModelAttrs) {
    const userFound = await this.userModel.searchByUser(data.username);

    if (userFound) {
      throw new Error("409|User already exists");
    }

    await this.userModel.register(data);

    return {
      success: {
        data: true,
      },
    } as ResponseOutput<SuccessfulInResponse, undefined>;
  }

  async login(data: UserModelAttrs) {
    const userFound = await this.userModel.login(data);

    const isValidPassword = await compare(
      data.password,
      userFound?.password || ""
    );

    if (!userFound || !isValidPassword) {
      throw new Error("400|Invalid username or password");
    }

    return {
      success: {
        data: {
          token: AuthHandler.createToken({
            username: userFound.username,
            accountId: userFound.accountId,
          }),
          username: userFound.username,
        },
      },
    } as ResponseOutput<SuccessfulInResponse, undefined>;
  }

  validateData(data: UserModelAttrs) {
    const parsed = userSchema.safeParse(data);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((error) => error.message);
      return {
        fail: { message: `400|${errors}` },
      } as ResponseOutput<undefined, FailInResponse>;
    }

    return {
      success: {
        data: true,
      },
    } as ResponseOutput<SuccessfulInResponse, undefined>;
  }
}

export default UserService;
