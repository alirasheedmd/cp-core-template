import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { v4 as uuidv4 } from 'uuid';
import { createPngDataUri } from 'unlazy/thumbhash';
import slugify from 'slugify';
import fs from 'fs';
import path from 'path';
import { DATABASE_URL } from '../../base';
import * as schema from '../db/schema';

// Setup database connection
const sql = neon(DATABASE_URL!);
const db = drizzle({
  client: sql,
  schema,
  casing: 'snake_case',
});

// Function to read and parse JSON files
function readJsonFile(filePath: string) {
  const fullPath = path.resolve(process.cwd(), filePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
}

// Seed categories with images
async function seedCategories() {
  console.log('Seeding categories...');
  
  // Read categories data
  const categoriesData = readJsonFile('src/scripts/categories.json');
  
  // Prepare categories for insertion
  const categoriesToInsert = categoriesData.map((category: any) => {
    const id = uuidv4();
    return {
      id,
      name: category.name,
      slug: slugify(category.name, { lower: true }),
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  
  // Insert categories
  await db.insert(schema.categories).values(categoriesToInsert);
  console.log(`Inserted ${categoriesToInsert.length} categories`);
  
  // Insert category images
  const imagesToInsert = categoriesToInsert.map((category, index) => {
    const categoryData = categoriesData[index];
    return {
      id: uuidv4(),
      alt: `${category.name} image`,
      src: categoryData.image,
      blurhash: createPngDataUri('NggCBYC4qFeId3d/dXWHgQAAAAAA'), // Default blurhash
      isMain: true,
      categoryId: category.id,
      productId: null,
    };
  });
  
  await db.insert(schema.images).values(imagesToInsert);
  console.log(`Inserted ${imagesToInsert.length} category images`);
  
  return categoriesToInsert;
}

// Seed products with images
async function seedProducts(categories: any[]) {
  console.log('Seeding products...');
  
  // Read products data
  const productsData = readJsonFile('src/scripts/products.json');
  
  // Create a map of category names to IDs for easy lookup
  const categoryMap = new Map();
  categories.forEach(category => {
    categoryMap.set(category.name, category.id);
  });
  
  // Prepare products for insertion
  const productsToInsert = productsData.map((product: any) => {
    const id = uuidv4();
    return {
      id,
      title: product.name,
      sku: product.sku,
      price: product.price,
      slug: slugify(product.name, { lower: true }),
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  
  // Insert products
  await db.insert(schema.products).values(productsToInsert);
  console.log(`Inserted ${productsToInsert.length} products`);
  
  // Insert product images
  const productImages: any[] = [];
  productsToInsert.forEach((product, index) => {
    const productData = productsData[index];
    const imageUrls = productData.image.split('\n').map((url: string) => url.trim()).filter(Boolean);
    
    imageUrls.forEach((imageUrl: string, imgIndex: number) => {
      productImages.push({
        id: uuidv4(),
        alt: `${product.title} image ${imgIndex + 1}`,
        src: imageUrl,
        blurhash: createPngDataUri('NggCBYC4qFeId3d/dXWHgQAAAAAA'), // Default blurhash
        isMain: imgIndex === 0, // First image is the main one
        productId: product.id,
        categoryId: null,
      });
    });
  });
  
  await db.insert(schema.images).values(productImages);
  console.log(`Inserted ${productImages.length} product images`);
  
  // Insert product-category relationships
  const productCategoryRelations: any[] = [];
  productsToInsert.forEach((product, index) => {
    const productData = productsData[index];
    const categoryId = categoryMap.get(productData.category);
    
    if (categoryId) {
      productCategoryRelations.push({
        productId: product.id,
        categoryId: categoryId,
      });
    }
  });
  
  await db.insert(schema.productCategories).values(productCategoryRelations);
  console.log(`Inserted ${productCategoryRelations.length} product-category relationships`);
}

// Main function to run the seeding process
async function main() {
  try {
    console.log('Starting database seeding...');
    const categories = await seedCategories();
    await seedProducts(categories);
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

// Run the main function
main();
