import type { Config } from "drizzle-kit";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DEV_DATABASE_URL!,
  },
} satisfies Config)
