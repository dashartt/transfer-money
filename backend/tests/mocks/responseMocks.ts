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
