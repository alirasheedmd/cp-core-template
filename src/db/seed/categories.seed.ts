import * as schema from "../schema/index";
import { db_for_seed as db } from "./seed";
import { faker } from "@faker-js/faker";
import slugify from 'slugify'

export default async function seedCategories() {
  const categoriesData: schema.Category[] = []

  for (let i = 0; i < 20; i++) {
    const name = faker.commerce.department()
    const categoryNameSlug = slugify(name, { lower: true })
    categoriesData.push({
      id: faker.string.uuid(),
      name: name,
      createdAt: faker.date.anytime(),
      updatedAt: faker.date.anytime(),
      isActive: false,
      description: null,
      parentId: null,
      slug: categoryNameSlug,
    })
  }

<<<<<<< Updated upstream
    for (let i = 0; i < 20; i++) {
        categoriesData.push({
          id: faker.string.uuid(),
          name: faker.commerce.department(),
          createdAt: faker.date.anytime(),
          updatedAt: faker.date.anytime(),
          isActive: false,
          description: null,
          parentId: null,
          slug: faker.lorem.slug(),
        })
    }
=======
  const result = await db.insert(schema.categories).values(categoriesData)
>>>>>>> Stashed changes

  console.log(`Seeding completed successfully! ${result}`)
}
