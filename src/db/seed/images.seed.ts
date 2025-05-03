import * as schema from "../schema/index";
import { imageSources } from '@/config/constants';
import { createPngDataUri } from 'unlazy/thumbhash';
import { db_for_seed as db } from "./seed";
import { faker } from "@faker-js/faker";

export default async function seedImages() {

    const products = await db.select().from(schema.products) 
    
    if (!products.length) {
        console.log("Make sure products are already seeded.");
        return;
    }

    const productIds = products.map((product) => product.id)

    const imagesData: schema.Image[] = [];

    for (const productId of productIds) {
        imagesData.push({
            id: faker.string.uuid(),
            alt: faker.lorem.words(3),
            productId: productId,
            src: imageSources.classifiedPlaceholder,
            blurhash: createPngDataUri("NggCBYC4qFeId3d/dXWHgQAAAAAA"),
            isMain: null
        })
    }

    const result = await db.insert(schema.images).values(imagesData)
    
    console.log(`Seeding completed successfully! ${result}`);
}
