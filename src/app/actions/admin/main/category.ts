"use server";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const visibility = formData.get("visibility") === "true";
  const images = JSON.parse(formData.get("images") as string);

  // TODO: Add your API call here to create the category
  console.log("Creating category:", { name, visibility, images });

  return { success: true };
}

export async function createSubcategory(formData: FormData) {
  const name = formData.get("name") as string;
  const visibility = formData.get("visibility") === "true";
  const images = JSON.parse(formData.get("images") as string);

  // TODO: Add your API call here to create the subcategory
  console.log("Creating subcategory:", { name, visibility, images });

  return { success: true };
}
