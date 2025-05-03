import * as schema from "../schema/index";
import { db_for_seed as db } from "./seed";
import { faker } from "@faker-js/faker";
export default async function seedCategories() {

    const categoriesData: schema.Category[] = [];

    for (let i = 0; i < 20; i++) {
        categoriesData.push({
            id: faker.string.uuid(),
            name: faker.commerce.department(),
            createdAt: faker.date.anytime(),
            updatedAt: faker.date.anytime(),
            isActive: false,
            description: null,
            image: null,
            parentId: null
        })
    }

    const result = await db.insert(schema.categories).values(categoriesData)
    
    console.log(`Seeding completed successfully! ${result}`);
}
