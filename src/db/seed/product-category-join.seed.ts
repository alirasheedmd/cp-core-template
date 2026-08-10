import { console } from 'inspector'
import * as schema from '../schema/index'
import { db_for_seed as db } from './seed'
import { faker } from '@faker-js/faker'

export default async function seedProductCategories() {
  const products = await db.select().from(schema.products)
  const categories = await db.select().from(schema.categories)

  if (!products.length || !categories.length) {
    console.log('Make sure products and categories are already seeded.')
    return
  }

  const productCategoryData: schema.ProductCategoryJoin[] = []

  for (const product of products) {
    // Assign 1–4 random categories per product
    const numberOfCategories = faker.number.int({ min: 1, max: 4 })
    const shuffled = faker.helpers
      .shuffle(categories)
      .slice(0, numberOfCategories)

    for (const category of shuffled) {
      productCategoryData.push({
        productId: product.id,
        categoryId: category.id,
      })
    }
  }

  await db.insert(schema.productCategories).values(productCategoryData)

  console.log(
    `Seeded ${productCategoryData.length} product-category relations.`,
  )
}
