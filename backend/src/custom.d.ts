import { JwtPayload } from "jsonwebtoken";
import {
  AccountForTransfer,
  AccountsIdsForTransfer,
} from "./types/TransactionTypes";

declare global {
  namespace Express {
    interface Request {
      tokenData?: JwtPayload;
      accountsForTransfer?: AccountForTransfer;
      accountsIdsForTransfer?: AccountsIdsForTransfer;
    }
  }
}
