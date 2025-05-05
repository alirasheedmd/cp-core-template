import type { Config } from 'drizzle-kit'
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import { DATABASE_URL } from './base'

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL!,
  },
} satisfies Config)
