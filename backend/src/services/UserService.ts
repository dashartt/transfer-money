import AuthHandler from "../auth/AuthHandler";
import { userSchema } from "../config/zodSchemas";
import UserModel, { User } from "../models/UserModel";

class UserService {
  private userModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async register(data: User) {
    const hasError = this.validateData(data);
    if (hasError) return hasError;

    await this.userModel.register(data);
  }

  async login(data: User) {
    const hasError = this.validateData(data);

    if (hasError) return hasError;

    await this.userModel.login(data);
    return AuthHandler.createToken(data.username);
  }

  validateData(data: User) {
    const parsed = userSchema.safeParse(data);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((error) => error.message);
      const errorMessage = { message: `400|${errors}` };
      return errorMessage;
    }
  }
}

export default UserService;
