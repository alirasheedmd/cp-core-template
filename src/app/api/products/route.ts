import { NextResponse } from 'next/server';
import { db } from '@/db';
import * as schema from '@/db/schema';
import { ilike, or } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { searchText } = await request.json();
    
    console.log('Search text:', searchText);
      
      const filteredProducts = await db.select().from(schema.products).where(or(
          ilike(schema.products.title, `%${searchText}%`),
          ilike(schema.products.description, `%${searchText}%`),
          ilike(schema.products.pageTitle, `%${searchText}%`),
          ilike(schema.products.collection, `%${searchText}%`),
          ilike(schema.products.type, `%${searchText}%`),
          ilike(schema.products.metaDescription, `%${searchText}%`),
          ilike(schema.products.barcode, `%${searchText}%`),
          ilike(schema.products.country, `%${searchText}%`),
          ilike(schema.products.sku, `%${searchText}%`),
          ilike(schema.products.hsCode, `%${searchText}%`),
          ilike(schema.products.tag, `%${searchText}%`),
          ilike(schema.products.organization, `%${searchText}%`),
      ))


    console.log('Filtered products:', filteredProducts);

    return NextResponse.json({ products: filteredProducts });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
