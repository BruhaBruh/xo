import { z } from 'zod';

export const codeSchema = z
  .string()
  .trim()
  .min(12)
  .max(12)
  .regex(/[a-f0-9]+/i);

export const userIdSchema = z
  .string()
  .trim()
  .min(12)
  .max(12)
  .regex(/[a-f0-9]+/i);

export const nicknameSchema = z
  .string()
  .trim()
  .min(3)
  .max(32)
  .regex(/[a-f0-9_-]+/i);

export const metadataSchema = z
  .object({
    code: codeSchema,
    userId: userIdSchema,
    nickname: nicknameSchema,
  })
  .required();

export type Code = z.infer<typeof codeSchema>;
export type UserId = z.infer<typeof userIdSchema>;
export type Nickname = z.infer<typeof nicknameSchema>;
export type Metadata = z.infer<typeof metadataSchema>;
