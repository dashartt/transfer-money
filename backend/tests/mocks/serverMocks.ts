type ResponseOutput = {
  status: number;
  message: string | string[];
};

export const registeredUserResponse = {
  status: 201,
  message: "Account created successfully. Login with your account to proceed",
} as ResponseOutput;

export const loginSucessUserResponse = {
  token: "fake_token",
  username: "dashartx",
  balance: 0,
  status: 200,
  message: "User authenticated successfully",
};

export const loginFailedUserResponse = {
  status: 400,
  message: "Invalid username or password",
};

export const accountDetailsRequestKey = {
  balance: 0,
  username: "dashartx",
  accountId: 1,
};

export const loginSuccessRequestKey = {
  username: "dashartx",
  token: "fake_token",
};

export const invalidRegisterServiceOutput = {
  fail: { message: "409|User already exists" },
};

export const invalidLoginServiceOutput = {
  fail: { message: "400|Invalid username or password" },
};

export const invalidGetBalanceServiceOutput = {
  fail: { message: "404|Account not found" },
};

export const invalidTransferServiceOutput = {
  withInvalidDebitedAccountId: {
    message: "404|Debit account not found",
  },
  withInvalidCreditAccountId: {
    message: "404|Credit account not found",
  },
  withBothInvaliAccountIds: {
    message: "404|Debit and credit account not found",
  },
};

export const invalidValidateBalanceServiceOutput = {
  message: "409|Insufficient balance",
};

export const afterDepositResponse = {
  status: 200,
  balance: 100,
  message: "Successfully deposited",
};

export const transaferResponse = {
  status: 200,
  message: "Successful transfer",
};

export const invalidDepositServiceOutput = {
  fail: {
    message: "Minimum deposit amount is R$1",
  },
};
