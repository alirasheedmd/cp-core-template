import 'dotenv/config'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { v4 as uuidv4 } from 'uuid'
import { createPngDataUri } from 'unlazy/thumbhash'
import slugify from 'slugify'
import fs from 'fs'
import path from 'path'
import { DATABASE_URL } from '../../base'
import * as schema from '../db/schema'

interface Category {
  name: string
  image: string
}

interface Product {
  name: string
  sku: string
  price: number
  image: string
  category: string
}

interface InsertedCategory {
  id: string
  name: string
  slug: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

interface CategoryImage {
  id: string
  alt: string
  src: string
  blurhash: string
  isMain: boolean
  categoryId: string
  productId: null
}

interface ProductImage {
  id: string
  alt: string
  src: string
  blurhash: string
  isMain: boolean
  productId: string
  categoryId: null
}

interface ProductCategoryRelation {
  productId: string
  categoryId: string
}

interface InsertedProduct {
  id: string
  title: string
  sku: string
  price: string
  slug: string
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

// Setup database connection
const sql = neon(DATABASE_URL!)
const db = drizzle({
  client: sql,
  schema,
  casing: 'snake_case',
})

// Function to read and parse JSON files
function readJsonFile(filePath: string): unknown {
  const fullPath = path.resolve(process.cwd(), filePath)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  return JSON.parse(fileContents)
}

// Seed categories with images
async function seedCategories(): Promise<InsertedCategory[]> {
  console.log('Seeding categories...')

  // Read categories data
  const categoriesData = readJsonFile(
    'src/scripts/categories.json',
  ) as Category[]

  // Prepare categories for insertion
  const categoriesToInsert: InsertedCategory[] = categoriesData.map(
    (category) => {
      const id = uuidv4()
      return {
        id,
        name: category.name,
        slug: slugify(category.name, { lower: true }),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    },
  )

  // Insert categories
  await db.insert(schema.categories).values(categoriesToInsert)
  console.log(`Inserted ${categoriesToInsert.length} categories`)

  // Insert category images
  const imagesToInsert: CategoryImage[] = categoriesToInsert.map(
    (category, index) => {
      const categoryData = categoriesData[index]
      return {
        id: uuidv4(),
        alt: `${category.name} image`,
        src: categoryData.image,
        blurhash: createPngDataUri('NggCBYC4qFeId3d/dXWHgQAAAAAA'), // Default blurhash
        isMain: true,
        categoryId: category.id,
        productId: null,
      }
    },
  )

  await db.insert(schema.images).values(imagesToInsert)
  console.log(`Inserted ${imagesToInsert.length} category images`)

  return categoriesToInsert
}

// Seed products with images
async function seedProducts(categories: InsertedCategory[]): Promise<void> {
  console.log('Seeding products...')

  // Read products data
  const productsData = readJsonFile('src/scripts/products.json') as Product[]

  // Create a map of category names to IDs for easy lookup
  const categoryMap = new Map<string, string>()
  categories.forEach((category) => {
    categoryMap.set(category.name, category.id)
  })

  // Prepare products for insertion
  const productsToInsert: InsertedProduct[] = productsData.map((product) => {
    const id = uuidv4()
    return {
      id,
      title: product.name,
      sku: product.sku,
      price: product.price.toString(),
      slug: slugify(product.name, { lower: true }),
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  // Insert products
  await db.insert(schema.products).values(productsToInsert)
  console.log(`Inserted ${productsToInsert.length} products`)

  // Insert product images
  const productImages: ProductImage[] = []
  productsToInsert.forEach((product, index) => {
    const productData = productsData[index]
    const imageUrls: string[] = productData.image
      .split('\n')
      .map((url) => url.trim())
      .filter((url): url is string => Boolean(url))

    imageUrls.forEach((imageUrl, imgIndex) => {
      productImages.push({
        id: uuidv4(),
        alt: `${product.title} image ${imgIndex + 1}`,
        src: imageUrl,
        blurhash: createPngDataUri('NggCBYC4qFeId3d/dXWHgQAAAAAA'), // Default blurhash
        isMain: imgIndex === 0, // First image is the main one
        productId: product.id,
        categoryId: null,
      })
    })
  })

  await db.insert(schema.images).values(productImages)
  console.log(`Inserted ${productImages.length} product images`)

  // Insert product-category relationships
  const productCategoryRelations: ProductCategoryRelation[] = []
  productsToInsert.forEach((product, index) => {
    const productData = productsData[index]
    const categoryId = categoryMap.get(productData.category)

    if (categoryId) {
      productCategoryRelations.push({
        productId: product.id,
        categoryId: categoryId,
      })
    }
  })

  await db.insert(schema.productCategories).values(productCategoryRelations)
  console.log(
    `Inserted ${productCategoryRelations.length} product-category relationships`,
  )
}

// Main function to run the seeding process
async function main(): Promise<void> {
  try {
    console.log('Starting database seeding...')
    const categories = await seedCategories()
    await seedProducts(categories)
    console.log('Database seeding completed successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

// Run the main function
main()
