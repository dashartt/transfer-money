export type FailInResponse = {
  message: string;
};

export type SuccessfulInResponse = {
  data: unknown;
};

export type ResponseOutput<
  SuccessfulInResponse = undefined,
  FailInResponse = undefined
> = {
  fail?: FailInResponse;
  success?: SuccessfulInResponse;
};
