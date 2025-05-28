'use server'

import { db } from '@/db'
import { getSession } from './auth'
import { eq } from 'drizzle-orm'
import { ilike, or, isNull, not, and } from 'drizzle-orm/sql'
import { cache } from 'react'
import {
  users,
  products,
  images,
  productCategories,
  categories,
  carts,
  orders,
  orderItems,
  type CategoryStatus,
  OrderStatus,
} from '@/db/schema'
import { CustomerInfoFormValues } from '@/components/web/customer/CustomerForm'
import { cookies } from 'next/headers'
import { type CartItem } from '@/types'
import { calcPrice, formatError } from './utils'
import { revalidatePath } from 'next/cache'
import { cartItemSchema } from '@/schemas/cart.schema'
import { generateSessionCartId } from '@/app/actions/web/auth/webAuth'
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from '@/schemas/checkout-form.schema'
import { insertOrderSchema } from '@/schemas/order.schema'
import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { redirect } from 'next/navigation'
import { customAlphabet } from 'nanoid'
import { CategoryFormValues } from '@/components/admin/categories/addCategory/CategoryInfo'
import { routes } from '@/config/routes'
import { inArray } from 'drizzle-orm'
import { SubcategoryFormValues } from '@/components/admin/categories/addSubCategory/SubcategoryInfo'
import { ProductFormValues } from '@/components/admin/products/addProduct/ProductInfo'
import { CustomerFormValues } from '@/components/admin/customers/addCustomer/CustomerInfo'
import { sendOrderConfirmationEmail } from './email'
// import { unstable_cacheTag as cacheTag } from 'next/cache'

// Current user
export const getCurrentUser = cache(async () => {
  const session = await getSession()
  console.log('session id', session)
  if (!session) return null

  // Skip database query during prerendering if we don't have a session
  // hack until we have PPR https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering
  if (
    typeof window === 'undefined' &&
    process.env.NEXT_PHASE === 'phase-production-build'
  ) {
    return null
  }

  try {
    const result = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, session.userId as string),
    })

    return result || null
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
})

// Get user by email
export const getUserByEmail = cache(async (email: string) => {
  try {
    const result = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    })
    return result || null
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
})

// Get user by ID (non-cached version for use in middleware and server actions)
export async function getUserById(userId: string) {
  try {
    const result = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
    })
    return result || null
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
}

// Create a new admin user
export async function createAdminUser(data: {
  id: string
  email: string
  password: string
}) {
  try {
    const adminData = {
      ...data,
      isAdmin: true, // Set isAdmin flag to true for admin users
    }

    const result = await db.insert(users).values(adminData).returning()
    return result[0] || null
  } catch (error) {
    console.error('Error creating admin user:', error)
    return null
  }
}

export async function getAllProducts() {
  // Get all products first
  const productsData = await db
    .select({
      id: products.id,
      title: products.title,
      description: products.description,
      price: products.price,
      slug: products.slug,
      shippingPrice: products.shippingPrice,
      tax: products.tax,
      sku: products.sku,
      status: products.status,
      currentStock: products.currentStock,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
    })
    .from(products)

  // Get all images
  const imagesData = await db
    .select({ src: images.src, productId: images.productId })
    .from(images)
    .where(not(isNull(images.productId)))

  // Map products and add their images as arrays
  const result = await Promise.all(
    productsData.map(async (data) => {
      const product = data

      const productCategories = await getProductCategories(product.id)

      const categories = productCategories.map((c) => c.name)

      // Find all images for this product
      const productImages = imagesData.filter(
        (img) => img.productId === product.id,
      )

      // Return the product with images as an array
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        categories: categories,
        price: product.price,
        images:
          productImages.length > 0 ? productImages.map((img) => img.src) : null,
        slug: product.slug,
        shippingPrice: product.shippingPrice as string,
        tax: product.tax as string,
        sku: product.sku,
        status: product.status,
        currentStock: product.currentStock,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      }
    }),
  )

  return result
}

interface SlugID {
  slug: string
  id: string
}

export async function getProductsByCategory(categorySlug: string) {
  const category = await db
    .select({ slug: categories.slug, id: categories.id })
    .from(categories)
    .where(eq(categories.slug, categorySlug))
  const categoryOne: SlugID = category[0]

  const productsData = await db
    .select({
      id: products.id,
      title: products.title,
      description: products.description,
      price: products.price,
      category: categories.slug,
      slug: products.slug,
      shippingPrice: products.shippingPrice,
      tax: products.tax,
    })
    .from(products)
    .innerJoin(productCategories, eq(productCategories.productId, products.id))
    .innerJoin(categories, eq(productCategories.categoryId, categories.id))
    .where(eq(categories.id, categoryOne.id))

  // Get all images
  const imagesData = await db
    .select({ src: images.src, productId: images.productId })
    .from(images)
    .where(not(isNull(images.productId)))

  // Map products and add their images as arrays
  const result = await Promise.all(
    productsData.map(async (data) => {
      const product = data

      const productCategories = await getProductCategories(product.id)

      const categories = productCategories.map((c) => c.name)

      // Find all images for this product
      const productImages = imagesData.filter(
        (img) => img.productId === product.id,
      )

      // Return the product with images as an array
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        categories: categories,
        price: product.price,
        image: productImages.length > 0 ? productImages[0].src : null,
        slug: product.slug,
        shippingPrice: product.shippingPrice as string,
        tax: product.tax as string,
      }
    }),
  )

  return result
}

export async function getProductCategories(productId: string) {
  const categoriesData = await db
    .select({
      id: categories.id,
      name: categories.name,
      productID: products.id,
    })
    .from(categories)
    .innerJoin(
      productCategories,
      eq(categories.id, productCategories.categoryId),
    )
    .innerJoin(products, eq(productCategories.productId, products.id))
    .where(eq(products.id, productId))

  return categoriesData
}

export async function getOneProduct(productSlug: string) {
  const product = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.slug, productSlug),
  })

  if (!product) return null

  // Get all images for this product
  const productImages = await db
    .select({ src: images.src })
    .from(images)
    .where(eq(images.productId, product.id))

  return {
    ...product,
    images: productImages.map((img) => img.src),
  }
}

export async function getProductSearchResults(searchText: string) {
  const filteredProducts = await db
    .select({ title: products.title, slug: products.slug })
    .from(products)
    .where(
      or(
        ilike(products.title, `%${searchText}%`),
        ilike(products.description, `%${searchText}%`),
        ilike(products.pageTitle, `%${searchText}%`),
        ilike(products.collection, `%${searchText}%`),
        ilike(products.type, `%${searchText}%`),
        ilike(products.metaDescription, `%${searchText}%`),
        ilike(products.barcode, `%${searchText}%`),
        ilike(products.country, `%${searchText}%`),
        ilike(products.sku, `%${searchText}%`),
        ilike(products.hsCode, `%${searchText}%`),
        ilike(products.tag, `%${searchText}%`),
        ilike(products.organization, `%${searchText}%`),
      ),
    )
  console.log('Filtered products:', filteredProducts)

  return filteredProducts
}

export async function createProduct(data: ProductFormValues) {
  try {
    console.log('product data', data)

    const generateId = customAlphabet('0123456789', 10)
    const productId = generateId()
    const publish_date = new Date(data.publishDate)

    console.log('product creation begin')
    const insertPayload = {
      id: productId,
      title: data.title,
      sku: data.sku,
      barcode: data.barcode || null,
      description: data.description,
      status: data.status,
      slug: data.slug,
      publishDate: publish_date,

      price: data.price,
      pricePerItem: data.pricePerItem || null,
      profit: data.profit || null,
      margin: data.margin || null,
      defaultPrice: data.defaultPrice || null,
      customPrice: data.customPrice || null,
      tax: data.tax || null,

      trackInventory: data.trackInventory || null,
      currentStock: data.currentStock || null,
      lowStockThreshold: data.lowStockThreshold || null,
      damageStock: data.damageStock || null,

      isPhysicalProduct: data.isPhysicalProduct || null,
      shippingPrice: data.shippingPrice || null,
      weight: data.weight || null,
      weightUnit: data.weightUnit || null,
      height: data.height || null,
      width: data.width || null,
      length: data.length || null,
      country: data.country || null,
      hsCode: data.hsCode || null,

      type: data.type || null,
      collection: data.collection || null,
      organization: data.organization || null,
      tag: data.tag || null,

      pageTitle: data.pageTitle || null,
      metaDescription: data.metaDescription || null,
      urlHandle: data.urlHandle || null,

      recommendedProducts: data.recommendedProducts || null,
    }

    console.log('Insert payload:', insertPayload)

    const product = await db.insert(products).values(insertPayload).returning()
    console.log('product created', product)

    const categoryIds = data.categories
    console.log('category ids', categoryIds)

    console.log('Establishing product-category relation')
    // Create product-category relationships
    const productCategoryInserts = categoryIds.map((categoryId) => ({
      productId: product[0].id,
      categoryId,
    }))

    console.log('P-C insert data', productCategoryInserts)
    const product_category = await db
      .insert(productCategories)
      .values(productCategoryInserts)
      .returning()
    console.log('P-C relation established ', product_category[0])

    const imagesData = data.images

    const imageInserts = []
    console.log('Storing product images')

    for (const img of imagesData) {
      const id = generateId(15)
      const imageInsert = {
        id,
        alt: img.alt,
        src: img.src,
        blurhash: img.base64,
        productId: product[0].id,
      }

      imageInserts.push(imageInsert)
    }
    const imageData = await db.insert(images).values(imageInserts).returning()

    console.log('Images stored', imageData)

    return product
  } catch (error) {
    console.log('error creating product', error)
    if (isRedirectError(error)) {
      throw error
    }
    return { success: false, message: formatError(error) }
  }
}

export async function updateProduct(id: string, data: ProductFormValues) {
  try {
    console.log('product data', data)

    const publish_date = new Date(data.publishDate)

    console.log('Updating product')
    const insertPayload = {
      title: data.title,
      sku: data.sku,
      barcode: data.barcode || null,
      description: data.description,
      status: data.status,
      slug: data.slug,
      publishDate: publish_date,

      price: data.price,
      pricePerItem: data.pricePerItem || null,
      profit: data.profit || null,
      margin: data.margin || null,
      defaultPrice: data.defaultPrice || null,
      customPrice: data.customPrice || null,
      tax: data.tax || null,

      trackInventory: data.trackInventory || null,
      currentStock: data.currentStock || null,
      lowStockThreshold: data.lowStockThreshold || null,
      damageStock: data.damageStock || null,

      isPhysicalProduct: data.isPhysicalProduct || null,
      shippingPrice: data.shippingPrice || null,
      weight: data.weight || null,
      weightUnit: data.weightUnit || null,
      height: data.height || null,
      width: data.width || null,
      length: data.length || null,
      country: data.country || null,
      hsCode: data.hsCode || null,

      type: data.type || null,
      collection: data.collection || null,
      organization: data.organization || null,
      tag: data.tag || null,

      pageTitle: data.pageTitle || null,
      metaDescription: data.metaDescription || null,
      urlHandle: data.urlHandle || null,

      recommendedProducts: data.recommendedProducts || null,
    }

    console.log('Insert payload:', insertPayload)

    const [product] = await db
      .update(products)
      .set(insertPayload)
      .where(eq(products.id, id))
      .returning()
    console.log('product updated', product)
    const categoryIds = data.categories || []
    console.log('Category IDs from input:', categoryIds)

    // Step 1: Fetch existing category relations for the product
    const existingRelations = await db.query.productCategories.findMany({
      where: (productCategories, { eq }) =>
        eq(productCategories.productId, product.id),
    })

    const existingCategoryIds = existingRelations.map((rel) => rel.categoryId)

    // Step 2: Find new category IDs to insert
    const newCategoryIds = categoryIds.filter(
      (id) => !existingCategoryIds.includes(id),
    )

    // Step 3: Find obsolete category IDs to delete
    const removedCategoryIds = existingCategoryIds.filter(
      (id) => !categoryIds.includes(id),
    )

    console.log('New category IDs to insert:', newCategoryIds)
    console.log('Obsolete category IDs to delete:', removedCategoryIds)

    // Step 4: Insert new relations
    if (newCategoryIds.length > 0) {
      const insertValues = newCategoryIds.map((categoryId) => ({
        productId: product.id,
        categoryId,
      }))

      const inserted = await db
        .insert(productCategories)
        .values(insertValues)
        .returning()

      console.log('Inserted product-category relations:', inserted)
    } else {
      console.log('No new product-category relations to insert.')
    }

    if (removedCategoryIds.length > 0) {
      const deleted = await db
        .delete(productCategories)
        .where(
          and(
            eq(productCategories.productId, product.id),
            inArray(productCategories.categoryId, removedCategoryIds),
          ),
        )

      console.log(
        'Deleted obsolete product-category relations:',
        removedCategoryIds,
        deleted,
      )
    } else {
      console.log('No obsolete product-category relations to delete.')
    }

    const imagesData = data.images
    console.log('Checking Product-Images relations')

    const existingImages = await db.query.images.findMany({
      where: (images, { eq }) => eq(images.productId, product.id),
    })

    const existingSrcSet = new Set(existingImages.map((img) => img.src)) // Prevent duplicate src

    console.log('Storing product images')

    const generateId = customAlphabet('0123456789', 15)

    const imageInserts = imagesData
      .filter((img) => !existingSrcSet.has(img.src)) // Skip if src already exists
      .map((img) => ({
        id: generateId(),
        alt: img.alt,
        src: img.src,
        blurhash: img.base64,
        productId: product.id,
      }))

    if (imageInserts.length > 0) {
      const imageData = await db.insert(images).values(imageInserts).returning()
      console.log('Images stored', imageData)
    } else {
      console.log('No new images to insert')
    }

    return product
  } catch (error) {
    console.log('error creating product', error)
    if (isRedirectError(error)) {
      throw error
    }
    return { success: false, message: formatError(error) }
  }
}

export async function deleteProducts(ids: string[]) {
  await db.delete(products).where(inArray(products.id, ids))

  console.log('products deleted')
  revalidatePath(routes.admin.products)
}

export async function getProduct(productId: string) {
  const product = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.id, productId),
  })
  if (!product) return null

  // Get all images for this product
  const productImages = await db
    .select({ src: images.src, alt: images.alt, base64: images.blurhash })
    .from(images)
    .where(eq(images.productId, product.id))

  // Get all categories
  const categories = await getProductCategories(product.id)
  return {
    ...product,
    publishDate: product.publishDate
      ? product.publishDate.toISOString().split('T')[0]
      : product.publishDate,
    images: productImages,
    categories: categories.map((c) => c.id),
  }
}

export async function getAllCategories() {
  // Get all categories first
  const categoriesData = await db.select().from(categories)

  // Get all images
  const imagesData = await db
    .select({ src: images.src, categoryId: images.categoryId })
    .from(images)
    .where(not(isNull(images.categoryId)))

  // Map categories and add their images as arrays
  const result = categoriesData.map((category) => {
    // Find all images for this category
    const categoryImages = imagesData.filter(
      (img) => img.categoryId === category.id,
    )

    // Return the category with images as an array
    return {
      id: category.id,
      name: category.name,
      images:
        categoryImages.length > 0 ? categoryImages.map((img) => img.src) : null,
      slug: category.slug,
      status: category.status,
      parentId: category.parentId,
      updatedAt: category.updatedAt,
    }
  })

  return result
}

export async function getSubcategoriesByParentId(parentId: string) {
  // Get all categories first
  const categoriesData = await db
    .select()
    .from(categories)
    .where(eq(categories.parentId, parentId))

  // Get all images
  const imagesData = await db
    .select({ src: images.src, categoryId: images.categoryId })
    .from(images)
    .where(not(isNull(images.categoryId)))

  // Map categories and add their images as arrays
  const result = categoriesData.map((category) => {
    // Find all images for this category
    const categoryImages = imagesData.filter(
      (img) => img.categoryId === category.id,
    )

    // Return the category with images as an array
    return {
      id: category.id,
      name: category.name,
      image: categoryImages.length > 0 ? categoryImages[0].src : null,
      slug: category.slug,
      status: category.status,
      parentId: category.parentId,
    }
  })

  return result
}

export async function updateCategoryStatus(id: string, status: CategoryStatus) {
  const category = await db
    .update(categories)
    .set({
      status: status,
    })
    .where(eq(categories.id, id))
    .returning({ status: categories.status })

  console.log('category updated', category[0])

  revalidatePath(routes.admin.categories)
}

export async function deleteCategory(id: string) {
  await db.delete(categories).where(eq(categories.id, id))

  console.log('category deleted')
  revalidatePath(routes.admin.categories)
}

export async function deleteCategories(ids: string[]) {
  await db.delete(categories).where(inArray(categories.id, ids))

  console.log('categories deleted')
  revalidatePath(routes.admin.categories)
}

export async function getOneCategory(categorySlug: string) {
  const category = await db.query.categories.findFirst({
    where: (categories, { eq }) => eq(categories.slug, categorySlug),
  })

  if (!category) return null

  // Get all images for this category
  const categoryImages = await db
    .select({ src: images.src })
    .from(images)
    .where(eq(images.categoryId, category.id))

  return {
    ...category,
    images: categoryImages.map((img) => img.src),
  }
}

export async function getCategory(categoryId: string) {
  const category = await db.query.categories.findFirst({
    where: (categories, { eq }) => eq(categories.id, categoryId),
  })
  if (!category) return null

  // Get all images for this category
  const categoryImages = await db
    .select({ src: images.src, alt: images.alt, base64: images.blurhash })
    .from(images)
    .where(eq(images.categoryId, category.id))

  return {
    ...category,
    images: categoryImages,
  }
}

export async function createCategory(data: CategoryFormValues) {
  console.log('category data', data)
  const generateId = customAlphabet('0123456789', 10)
  const id = generateId()
  const [category] = await db
    .insert(categories)
    .values({
      id: id,
      ...data,
    })
    .returning()
  console.log('category created', category)

  const imagesData = data.images

  const imageInserts = []
  console.log('Storing product images')

  for (const img of imagesData) {
    const id = generateId(15)
    const imageInsert = {
      id,
      alt: img.alt,
      src: img.src,
      blurhash: img.base64,
      categoryId: category.id,
    }

    imageInserts.push(imageInsert)
  }
  const imageData = await db.insert(images).values(imageInserts).returning()

  console.log('Images stored', imageData)

  return category
}

export async function updateCategory(id: string, data: CategoryFormValues) {
  console.log('category data', data)

  const [category] = await db
    .update(categories)
    .set({
      ...data,
    })
    .where(eq(categories.id, id))
    .returning()
  console.log('category updated', category)

  const imagesData = data.images
  console.log('Checking Category-Images relations')

  const existingImages = await db.query.images.findMany({
    where: (images, { eq }) => eq(images.categoryId, category.id),
  })

  const existingSrcSet = new Set(existingImages.map((img) => img.src)) // Prevent duplicate src

  console.log('Storing product images')

  const generateId = customAlphabet('0123456789', 15)

  const imageInserts = imagesData
    .filter((img) => !existingSrcSet.has(img.src)) // Skip if src already exists
    .map((img) => ({
      id: generateId(),
      alt: img.alt,
      src: img.src,
      blurhash: img.base64,
      productId: category.id,
    }))

  if (imageInserts.length > 0) {
    const imageData = await db.insert(images).values(imageInserts).returning()
    console.log('Images stored', imageData)
  } else {
    console.log('No new images to insert')
  }

  return category
}

export async function createSubcategory(data: SubcategoryFormValues) {
  console.log('subcategory data', data)
  const generateId = customAlphabet('0123456789', 10)
  const id = generateId()
  const [category] = await db
    .insert(categories)
    .values({
      id: id,
      ...data,
    })
    .returning()
  console.log('subcategory created', category)

  const imagesData = data.images

  const imageInserts = []
  console.log('Storing product images')

  for (const img of imagesData) {
    const id = generateId(15)
    const imageInsert = {
      id,
      alt: img.alt,
      src: img.src,
      blurhash: img.base64,
      categoryId: category.id,
    }

    imageInserts.push(imageInsert)
  }
  const imageData = await db.insert(images).values(imageInserts).returning()

  console.log('Images stored', imageData)

  return category
}

export async function updateSubcategory(
  id: string,
  data: SubcategoryFormValues,
) {
  console.log('subcategory data', data)

  const [category] = await db
    .update(categories)
    .set({
      ...data,
    })
    .where(eq(categories.id, id))
    .returning()
  console.log('subcategory updated', category)

  const imagesData = data.images
  console.log('Checking Category-Images relations')

  const existingImages = await db.query.images.findMany({
    where: (images, { eq }) => eq(images.categoryId, category.id),
  })

  const existingSrcSet = new Set(existingImages.map((img) => img.src)) // Prevent duplicate src

  console.log('Storing product images')

  const generateId = customAlphabet('0123456789', 15)

  const imageInserts = imagesData
    .filter((img) => !existingSrcSet.has(img.src)) // Skip if src already exists
    .map((img) => ({
      id: generateId(),
      alt: img.alt,
      src: img.src,
      blurhash: img.base64,
      productId: category.id,
    }))

  if (imageInserts.length > 0) {
    const imageData = await db.insert(images).values(imageInserts).returning()
    console.log('Images stored', imageData)
  } else {
    console.log('No new images to insert')
  }

  return category
}

export async function getAllCustomers() {
  const customers = await db
    .select()
    .from(users)
    .where(eq(users.isAdmin, false))
  return customers
}

export async function getCustomerProfileInfo(userId: string) {
  const user = await db
    .select({
      firstName: users.firstName,
      lastName: users.lastName,
      phoneNumber: users.phoneNumber,
      buildingNo: users.buildingNo,
      street: users.street,
      district: users.district,
      city: users.city,
      province: users.province,
      postalCode: users.postalCode,
      secondaryNumber: users.secondaryNumber,
      shortAddress: users.shortAddress,
      unitNumber: users.unitNumber,
      country: users.country,
    })
    .from(users)
    .where(eq(users.id, userId))

  return user
}

export async function createCustomer(data: CustomerFormValues) {}

export async function updateCustomer(data: CustomerFormValues) {}

export async function getCustomer(customerId: string) {
  const customer = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, customerId),
  })
  if (!customer) return null

  return customer
}

export async function updateUserInfo(data: CustomerInfoFormValues) {
  const user = await getCurrentUser()
  if (!user) return

  const result = await db
    .update(users)
    .set({ ...data })
    .where(eq(users.id, user.id))
    .returning()
  console.log('data result', result)

  return result[0]
}

export async function deleteUserInfo() {
  const user = await getCurrentUser()
  console.log('user', user)
  if (!user) return

  const result = await db
    .update(users)
    .set({
      phoneNumber: null,
      buildingNo: null,
      street: null,
      district: null,
      city: null,
      province: null,
      postalCode: null,
      secondaryNumber: null,
      unitNumber: null,
      country: null,
    })
    .where(eq(users.id, user.id))
    .returning()

  return result[0]
}

export async function deleteCustomers(ids: string[]) {
  await db.delete(users).where(inArray(users.id, ids))

  console.log('customers deleted')
  revalidatePath(routes.admin.customers)
}

export async function getMyCart() {
  try {
    const sessionCartId = await generateSessionCartId()
    console.log('Session Cart ID', sessionCartId)

    const user = await getCurrentUser()
    const userId = user?.id as string

    if (!sessionCartId) return undefined

    const cart = await db.query.carts.findFirst({
      where: userId
        ? eq(carts.userId, userId)
        : eq(carts.sessionCartId, sessionCartId),
    })

    return cart
  } catch (error) {
    // Handle cookie errors during server rendering
    if (error instanceof Error && error.message.includes('cookies')) {
      console.log('Cookie access error during cart fetch:', error.message)
      return undefined
    }

    console.error('Error fetching cart:', error)
    return undefined
  }
}

export const addItemToCart = async (data: CartItem, currentPath: string) => {
  try {
    console.log('data', data)
    console.log('current path', currentPath)
    const validatedItemData = cartItemSchema.parse(data)

    const sessionCartId = await generateSessionCartId()
    console.log('Session Cart ID', sessionCartId)
    if (!sessionCartId) throw new Error('Cart Session not found')

    const user = await getCurrentUser()

    const userId = user?.id as string

    const cart = await getMyCart()

    console.log('My cart db', cart)

    const product = await db.query.products.findFirst({
      where: eq(products.id, validatedItemData.productId),
    })

    console.log('my product', product)

    if (!product) throw new Error('Product not found')

    if (!cart) {
      if (Number(product.currentStock) < 1) throw new Error('Not enough stock')

      const prices = calcPrice([validatedItemData])

      console.log('prices', prices)
      const id = crypto.randomUUID()
      console.log('nanoid', id)
      const cartInfo = {
        id: id,
        userId: userId ? userId : null,
        sessionCartId: sessionCartId,
        items: [validatedItemData],
        itemsPrice: prices.itemsPrice,
        shippingPrice: prices.shippingPrice,
        taxPrice: prices.taxPrice,
        totalPrice: prices.totalPrice,
      }
      const cartData = await db.insert(carts).values(cartInfo).returning()

      console.log('my bd Carttt', cartData)

      console.log('cart created')
      revalidatePath(currentPath)
      return {
        success: true,
        message: 'Item added to cart successfully',
      }
    } else {
      const existItem = cart.items.find(
        (x) => x.productId === validatedItemData.productId,
      )
      console.log('existItem', existItem)
      if (existItem) {
        if (Number(product.currentStock) < existItem.qty + 1)
          throw new Error('Not enough stock')
        cart.items.find(
          (x) => x.productId === validatedItemData.productId,
        )!.qty = existItem.qty + 1
      } else {
        if (Number(product.currentStock) < 1)
          throw new Error('Not enough stock')
        cart.items.push(validatedItemData)
        console.log('cart items', cart.items)
      }
      await db
        .update(carts)
        .set({
          items: cart.items,
          ...calcPrice(cart.items),
        })
        .where(eq(carts.id, cart.id))

      console.log('cart updated')
      revalidatePath(currentPath)
      return {
        success: true,
        message: `${product.title} ${
          existItem ? 'updated in' : 'added to'
        } cart successfully`,
      }
    }
  } catch (error) {
    console.log('error creating cart')
    return { success: false, message: formatError(error) }
  }
}

export const removeItemFromCart = async (
  productId: string,
  currentPath: string,
) => {
  try {
    const sessionCartId = await generateSessionCartId()
    console.log('Session Cart ID', sessionCartId)
    if (!sessionCartId) throw new Error('Cart Session not found')

    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
    })
    if (!product) throw new Error('Product not found')

    const cart = await getMyCart()
    if (!cart) throw new Error('Cart not found')

    const exist = cart.items.find((x) => x.productId === productId)
    if (!exist) throw new Error('Item not found')

    if (exist.qty === 1) {
      cart.items = cart.items.filter((x) => x.productId !== exist.productId)
    } else {
      cart.items.find((x) => x.productId === productId)!.qty = exist.qty - 1
    }
    await db
      .update(carts)
      .set({
        items: cart.items,
        ...calcPrice(cart.items),
      })
      .where(eq(carts.id, cart.id))
    revalidatePath(currentPath)
    return {
      success: true,
      message: `${product.title}  ${
        cart.items.find((x) => x.productId === productId)
          ? 'updated in'
          : 'removed from'
      } cart successfully`,
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export const removeAllProductItemFromCart = async (productId: string) => {
  try {
    const sessionCartId = await generateSessionCartId()
    console.log('Session Cart ID', sessionCartId)
    if (!sessionCartId) throw new Error('Cart Session not found')

    const product = await db.query.products.findFirst({
      where: eq(products.id, productId),
    })
    if (!product) throw new Error('Product not found')

    const cart = await getMyCart()
    if (!cart) throw new Error('Cart not found')

    const exist = cart.items.find((x) => x.productId === productId)
    if (!exist) throw new Error('Item not found')

    if (exist.qty === 1) {
      cart.items = cart.items.filter((x) => x.productId !== exist.productId)
    } else {
      for (let i = 0; i < exist.qty; i++) {
        cart.items = cart.items.filter((x) => x.productId !== exist.productId)
      }
    }
    await db
      .update(carts)
      .set({
        items: cart.items,
        ...calcPrice(cart.items),
      })
      .where(eq(carts.id, cart.id))
    console.log('all product with id deleted')
    revalidatePath(`/cart`)
    return {
      success: true,
      message: `${product.title}  ${
        cart.items.find((x) => x.productId === productId)
          ? 'updated in'
          : 'removed from'
      } cart successfully`,
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export const clearCart = async () => {
  try {
    const sessionCartId = (await cookies()).get('sessionCartId')?.value
    if (!sessionCartId) throw new Error('Cart Session not found')

    const cart = await getMyCart()
    if (!cart) throw new Error('Cart not found')

    await db
      .update(carts)
      .set({
        items: [],
        ...calcPrice([]),
      })
      .where(eq(carts.id, cart.id))

    revalidatePath('/cart')
    return {
      success: true,
      message: 'Cart has been cleared successfully',
    }
  } catch (error) {
    return { success: false, message: formatError(error) }
  }
}

export async function createOrder(data: CheckoutFormValues, fullName: string) {
  try {
    console.log('order data', data)
    const validatedAddress = checkoutFormSchema.parse(data)

    const user = await getCurrentUser()
    if (!user) {
      const existingUser = await getUserByEmail(validatedAddress.email)
      if (!existingUser) {
        const newUserId = crypto.randomUUID()
        const newUser = await db
          .insert(users)
          .values({
            id: newUserId,
            email: validatedAddress.email,
            password: '',
            isVerified: false,
          })
          .returning()
        console.log('new user', newUser)
      }
    }

    const unauthorizedUser = await getUserByEmail(validatedAddress.email)

    const cart = await getMyCart()
    if (!cart) return

    console.log('my cart order', cart)

    const customerAddress = {
      firstName: validatedAddress.firstName,
      lastName: validatedAddress.lastName,
      phoneNumber: validatedAddress.phoneNumber,
      buildingNo: validatedAddress.house,
      street: validatedAddress.street,
      district: validatedAddress.district,
      city: validatedAddress.city,
      province: validatedAddress.province,
      postalCode: validatedAddress.postalCode as string,
      country: validatedAddress.country,
      secondaryNumber: validatedAddress.secondaryNumber,
      shortAddress: validatedAddress.shortAddress,
      unitNumber: validatedAddress.unitNumber,
      paymentMethod: validatedAddress.paymentMethod,
    }
    if (user) {
      const updateUser = await db
        .update(users)
        .set({ ...customerAddress })
        .where(eq(users.id, user.id))
        .returning()

      console.log('data result', updateUser)
    } else if (unauthorizedUser) {
      const updateUser = await db
        .update(users)
        .set({ ...customerAddress })
        .where(eq(users.id, unauthorizedUser.id))
        .returning()

      console.log('data result', updateUser)
    }

    const shippingAddress = {
      firstName: validatedAddress.firstName,
      lastName: validatedAddress.lastName,
      phoneNumber: validatedAddress.phoneNumber,
      buildingNo: validatedAddress.house,
      street: validatedAddress.street,
      district: validatedAddress.district,
      city: validatedAddress.city,
      province: validatedAddress.province,
      postalCode: validatedAddress.postalCode as string,
      country: validatedAddress.country,
      secondaryNumber: validatedAddress.secondaryNumber,
      shortAddress: validatedAddress.shortAddress,
      unitNumber: validatedAddress.unitNumber,
    }
    const generateSixDigitId = customAlphabet('0123456789', 6)
    const orderId = generateSixDigitId()

    const order = insertOrderSchema.parse({
      id: orderId,
      userId: user ? user.id : unauthorizedUser?.id,
      shippingAddress: shippingAddress,
      paymentMethod: validatedAddress.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
      orderNotes: validatedAddress.notes,
    })

    console.log('order, data ...', order)
    const insertedOrder = await db.insert(orders).values(order).returning()
    console.log('✅ Inserted order:', insertedOrder)

    for (const item of cart.items) {
      await db.insert(orderItems).values({
        ...item,
        quantity: item.qty,
        price: item.price.toFixed(2),
        orderId: insertedOrder[0].id,
      })
    }
    console.log('inserted items')

    await sendOrderConfirmationEmail({
      email: data.email,
      orderId: orderId,
      fullName: fullName,
      items: cart.items.map((item) => ({
        ...item,
        price: item.price.toLocaleString(),
        quantity: item.qty,
        orderId: orderId,
      })),
      totalAmount: Number(cart.totalPrice),
      shippingCost: Number(cart.shippingPrice),
    })
    await db
      .update(carts)
      .set({
        items: [],
        totalPrice: '0',
        shippingPrice: '0',
        taxPrice: '0',
        itemsPrice: '0',
      })
      .where(eq(carts.id, cart.id))

    const insertedOrderId = insertedOrder[0].id

    console.log('inserted order id', insertedOrderId)
    if (!insertedOrderId) throw new Error('Order not created')
    redirect(`/order-confirmation/${insertedOrderId}`)
    return {
      success: true,
      message: 'order created successfully',
    }
  } catch (error) {
    console.log('error creating order')
    if (isRedirectError(error)) {
      throw error
    }
    return { success: false, message: formatError(error) }
  }
}

export async function getOrderById(orderId: string) {
  const order = await db.query.orders.findFirst({
    where: (orders, { eq }) => eq(orders.id, orderId),
    with: {
      orderItems: true,
      user: {
        columns: { email: true },
      },
    },
  })
  return order
}
export async function getOrdersByUserId(userId: string) {
  const order = await db.query.orders.findMany({
    where: (orders, { eq }) => eq(orders.userId, userId),
    columns: {
      id: true,
      totalPrice: true,
    },
  })
  return order
}

export async function getAllOrders() {
  const order = await db.query.orders.findMany({
    with: {
      orderItems: true,
      user: {
        columns: { email: true },
      },
    },
  })

  return order
}

export async function deleteOrders(ids: string[]) {
  await db.delete(orders).where(inArray(orders.id, ids))

  console.log('orders deleted')
  revalidatePath(routes.admin.orders)
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const order = await db
    .update(orders)
    .set({
      status: status,
    })
    .where(eq(orders.id, id))
    .returning({ status: orders.status })

  console.log('order updated', order[0])

  revalidatePath(routes.admin.orders)
}

export async function updatePaidStatus(id: string, value: string) {
  const isPaid = value === 'paid' ? true : false
  const order = await db
    .update(orders)
    .set({
      isPaid: isPaid,
    })
    .where(eq(orders.id, id))
    .returning({ isPaid: orders.isPaid })

  console.log('order updated', order[0])

  revalidatePath(routes.admin.orderDetails(id))
}

export async function deleteOrder(id: string) {
  await db.delete(orders).where(eq(orders.id, id))

  console.log('order deleted')
  revalidatePath(routes.admin.orders)
}