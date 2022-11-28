import { JwtPayload, sign, verify } from "jsonwebtoken";

const jwtKey = process.env.JWT_KEY || "";

class AuthHandler {
  static createToken(username: string) {
    return sign({ username }, jwtKey);
  }

  static validateToken(token: string) {
    if (!token) throw new Error("401|Unauthorized user");

    try {
      const data = verify(token, jwtKey);
      return data as JwtPayload;
    } catch (error) {
      if (error) {
        throw new Error("400|Token must be a valid");
      }
    }
  }
}

export default AuthHandler;
