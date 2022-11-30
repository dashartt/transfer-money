import { sign, verify } from "jsonwebtoken";
import { UserToken } from "../types/UserTypes";

const jwtKey = process.env.JWT_KEY || "";

class AuthHandler {
  static createToken({ accountId, username }: UserToken) {
    return sign({ username, accountId }, jwtKey);
  }

  static validateToken(token: string) {
    if (!token) throw new Error("401|Unauthorized user");

    try {
      const data = verify(token, jwtKey);
      return data as UserToken;
    } catch (error) {
      if (error) {
        throw new Error("400|Token must be a valid");
      }
    }
  }
}

export default AuthHandler;
