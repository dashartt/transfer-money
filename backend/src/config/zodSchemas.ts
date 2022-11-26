import zod, { z } from "zod";

export const userSchema = zod.object({
  username: zod
    .string()
    .min(4, "username must be min 4 characteres")
    .max(12, "username must be max 12 characteres"),
  password: zod
    .string()
    .min(8, "password must be min 8 characteres")
    .max(15, "password must be max 15 characteres"),
  accountId: zod.number().optional(),
});

export const transactionSchema = zod.object({
  debitedAccountId: zod.number(),
  creditedAccountId: zod.number(),
  value: zod
    .number()
    .min(0.01, "Invalid value, transfers above R$0.01 are valid"),
  createdAt: zod.date().optional(),
});
