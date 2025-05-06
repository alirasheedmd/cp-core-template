import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '../schema/index'
import { neon } from '@neondatabase/serverless'
import seedProducts from './products.seed'
import seedImages from './images.seed'
import seedCategories from './categories.seed'
import deleteSeedData from './deleteSeedData'
import seedProductCategories from './product-category-join.seed'
import { DATABASE_URL } from '../../../base'

const sql = neon(DATABASE_URL!)
export const db_for_seed = drizzle({
  client: sql,
  schema,
  casing: 'snake_case',
})
async function main() {
  // await seedProducts()
<<<<<<< Updated upstream
  await seedImages()
  // await seedProductCategories()
  // await seedCategories()
=======
  // await seedImages()
  //   await seedProductCategories()
  await seedCategories()
>>>>>>> Stashed changes

  // await deleteSeedData();
}

main().catch((e) => {
  throw e
})
