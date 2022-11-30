import { JwtPayload } from "jsonwebtoken";
import {
  AccountForTransfer,
  AccountsIdsForTransfer,
} from "./types/TransactionTypes";
import { AuthedUserResponse, UserToken } from "./types/UserTypes";

declare global {
  namespace Express {
    interface Request {
      tokenData?: UserToken;
      accountsForTransfer?: AccountForTransfer;
      accountsIdsForTransfer?: AccountsIdsForTransfer;
      userData: AuthedUserResponse;
    }
  }
}
