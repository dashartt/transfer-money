export type LoginServiceOutput = {
  token: string;
  username: string;
};

export type LoginSuccessNext = {
  username: string;
  token: string;
};

export type FailInService = {
  message: string;
};

export type SuccessfulInService = {
  data: unknown;
};

export type ServiceOutput<
  SuccessfulInService = undefined,
  FailInService = undefined
> = {
  fail?: FailInService;
  success?: SuccessfulInService;
};
