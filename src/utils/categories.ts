import { ICategory } from '@/types'

/**
 * Extracts all subcategories from a list of categories into a flat array
 * @param categories Array of categories that may contain subcategories
 * @returns Array of all subcategories
 */
export const getAllSubcategories = (categories: ICategory[]): ICategory[] => {
  const subcategories: ICategory[] = []

  const extractSubcategories = (category: ICategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      subcategories.push(...category.subcategories)
      // Recursively extract subcategories of subcategories if needed
      category.subcategories.forEach(extractSubcategories)
    }
  }

  categories.forEach(extractSubcategories)
  return subcategories
}

/**
 * Gets all categories (main and subcategories) in a flat array
 * @param categories Array of main categories
 * @returns Array of all categories including subcategories
 */
// export const getAllCategories = (categories: ICategory[]): ICategory[] => {
//   const allCategories: ICategory[] = [...categories]

//   const extractSubcategories = (category: ICategory) => {
//     if (category.subcategories && category.subcategories.length > 0) {
//       allCategories.push(...category.subcategories)
//       // Recursively extract subcategories of subcategories if needed
//       category.subcategories.forEach(extractSubcategories)
//     }
//   }

//   categories.forEach(extractSubcategories)
//   return allCategories
// }
