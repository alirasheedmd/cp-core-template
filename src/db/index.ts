import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema/index'

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle({ client: sql, schema, casing: 'snake_case' })

// Log the environment the database is connected to
const environment =
  process.env.NODE_ENV === 'production' ? 'production' : 'development'
console.log(`Connected to ${environment} database`)
