import { JwtPayload } from "jsonwebtoken";
import {
  AccountForTransfer,
  AccountsIdsForTransfer,
} from "./types/TransactionTypes";
import { UserResponseOutput } from "./types/UserTypes";

declare global {
  namespace Express {
    interface Request {
      tokenData?: JwtPayload;
      accountsForTransfer?: AccountForTransfer;
      accountsIdsForTransfer?: AccountsIdsForTransfer;
      userData: UserResponseOutput;
    }
  }
}
