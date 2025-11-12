import * as schema from '../schema/index'
import { db_for_seed as db } from './seed'
import { faker } from '@faker-js/faker'
import slugify from 'slugify'

export default async function seedCategories() {
  const categoriesData: schema.Category[] = []

  for (let i = 0; i < 5; i++) {
    const name = faker.commerce.department()
    const categoryNameSlug = slugify(name, { lower: true })
    categoriesData.push({
      id: faker.string.uuid(),
      name: name,
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.anytime(),
      status: 'enable',
      parentId: null,
      slug: categoryNameSlug,
      pageTitle: null,
      metaKeyword: null,
      metaDescription: null,
      urlHandle: null,
    })
  }

  const result = await db.insert(schema.categories).values(categoriesData)

  console.log(`Seeding completed successfully! ${result}`)
}
