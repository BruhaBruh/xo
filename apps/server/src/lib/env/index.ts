import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  HOST: z.string().ip({ version: 'v4' }).default('0.0.0.0'),
  PORT: z.preprocess(
    (v) => Number.parseInt(v?.toString() || '', 10),
    z.number().min(1).max(65535).default(5000)
  ),
  REDIS_URL: z.string().default('redis://localhost:6379'),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
