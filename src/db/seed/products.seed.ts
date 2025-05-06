import { console } from "inspector";
import * as schema from "../schema/index";
import { db_for_seed as db } from "./seed";
import { faker } from "@faker-js/faker";
import slugify from 'slugify'

const statusOptions = ['active', 'inactive'] as const

export default async function seedProducts() {
  const productsData: schema.Product[] = []

  for (let i = 0; i < 20; i++) {
    const tilte = faker.commerce.productName()
    const productTitleSlug = slugify(tilte, { lower: true })
    productsData.push({
      id: faker.string.uuid(),
      title: tilte,
      sku: faker.string.uuid(),
      status: faker.helpers.arrayElement(statusOptions),
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
      slug: productTitleSlug,
    })
  }

<<<<<<< Updated upstream
    for (let i = 0; i < 20; i++) {
        productsData.push({
<<<<<<< Updated upstream
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
            recommendedProducts: undefined
=======
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
          slug: faker.lorem.slug(),
>>>>>>> Stashed changes
        })
    }
=======
  const result = await db.insert(schema.products).values(productsData)
>>>>>>> Stashed changes

  console.log(`Seeding completed successfully! ${result}`)
}
