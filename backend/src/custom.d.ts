import { AccountDetails, DepositOutput } from "./types/AccountTypes";
import { LoginSuccessNext } from "./types/ServerTypes";
import {
  AccountForTransfer,
  AccountsIdsForTransfer,
} from "./types/TransactionTypes";
import { AuthedUserResponse, UserToken } from "./types/UserTypes";

declare global {
  namespace Express {
    interface Request {
      loginSuccessData?: LoginSuccessNext;
      accountDetails?: AccountDetails;
      depositOutput?: DepositOutput;

      tokenData?: UserToken;
      accountsForTransfer?: AccountForTransfer;
      accountsIdsForTransfer?: AccountsIdsForTransfer;
      userData: AuthedUserResponse;
    }
  }
}
