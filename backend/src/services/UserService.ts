import { compare } from "bcryptjs";
import AuthHandler from "../auth/AuthHandler";
import { userSchema } from "../config/zodSchemas";
import UserModel from "../models/UserModel";
import {
  FailInService,
  ServiceOutput,
  SuccessfulInService,
} from "../types/ServerTypes";
import { UserModelAttrs } from "../types/UserTypes";

class UserService {
  private userModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async register(data: UserModelAttrs) {
    const userFound = await this.userModel.searchByUser(data.username);

    if (userFound) {
      return {
        fail: { message: "409|User already exists" },
      } as ServiceOutput<undefined, FailInService>;
    }

    await this.userModel.register(data);
  }

  async login(data: UserModelAttrs) {
    const userFound = await this.userModel.login(data);

    const isValidPassword = await compare(
      data.password,
      userFound?.password || ""
    );

    if (!userFound || !isValidPassword) {
      return {
        fail: { message: "400|Invalid username or password" },
      } as ServiceOutput<undefined, FailInService>;
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
    } as ServiceOutput<SuccessfulInService, undefined>;
  }

  validateData(data: UserModelAttrs) {
    const parsed = userSchema.safeParse(data);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((error) => error.message);
      return {
        fail: { message: `400|${errors}` },
      } as ServiceOutput<undefined, FailInService>;
    }
  }
}

export default UserService;
