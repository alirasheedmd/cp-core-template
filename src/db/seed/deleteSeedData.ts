import * as schema from '../schema/index'
import { db_for_seed as db } from './seed'

export default async function deleteSeedData() {
  await db.delete(schema.products)
  console.log('Products Seed Data Deleted Successfully!')

  await db.delete(schema.images)
  console.log('Images Seed Data Deleted Successfully!')

  await db.delete(schema.categories)
  console.log('Categories Seed Data Deleted Successfully!')

  await db.delete(schema.productCategories)
  console.log('ProductCategories Seed Data Deleted Successfully!')
}
