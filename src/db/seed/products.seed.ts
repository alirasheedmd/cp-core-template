import { console } from "inspector";
import * as schema from "../schema/index";
import { db_for_seed as db } from "./seed";
import { faker } from "@faker-js/faker";

export default async function seedProducts() {

    const productsData: schema.Product[] = [];

    for (let i = 0; i < 20; i++) {
        productsData.push({
          id: faker.string.uuid(),
          title: faker.commerce.productName(),
          sku: faker.string.uuid(),
          status: faker.word.words(1),
          price: faker.commerce.price(),
          createdAt: faker.date.anytime(),
          updatedAt: faker.date.anytime(),
          length: null,
          barcode: null,
          description: null,
          publishDate: null,
          pricePerItem: null,
          costPrice: null,
          profit: null,
          margin: null,
          defaultPrice: null,
          customPrice: null,
          tax: null,
          trackInventory: null,
          currentStock: null,
          lowStockThreshold: null,
          damageStock: null,
          isPhysicalProduct: null,
          shippingPrice: null,
          weight: null,
          weightUnit: null,
          height: null,
          width: null,
          country: null,
          hsCode: null,
          type: null,
          collection: null,
          organization: null,
          tag: null,
          pageTitle: null,
          metaDescription: null,
          urlHandle: null,
          recommendedProducts: undefined,
          images: null,
        })
    }

    const result = await db.insert(schema.products).values(productsData)
    
    console.log(`Seeding completed successfully! ${result}`);
}
