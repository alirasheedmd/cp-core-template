import { getOneProduct } from '@/lib/dal'
import WebContainer from '@/components/web/shared/WebContainer'
import ProductImage from './ProductImage'
import ProductInfo from './ProductInfo'
import ProductSpecifications from './ProductSpecifications'

export default async function ProductData({ product }: { product: string }) {
  const productDetails = await getOneProduct(product)
  // console.log(productDetails)

  if (!productDetails) {
    return (
      <WebContainer>
        <div className="py-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Product not found
          </h2>
        </div>
      </WebContainer>
    )
  }

  return (
    <WebContainer>
      <div className="mx-auto max-w-5xl py-8">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
          {/* Left Column - Product Image */}
          <div>
            <ProductImage
              title={productDetails.title}
              imageUrl={productDetails.images?.[0]}
              images={productDetails.images?.slice(1)}
            />
          </div>

          {/* Right Column - Product Info */}
          <div>
            <ProductInfo
              id={productDetails.id}
              title={productDetails.title}
              sku={productDetails.sku}
              price={productDetails.price}
              description="Experience the perfect blend of style and functionality with our premium product. Crafted with meticulous attention to detail, this exceptional item combines innovative design with superior quality materials. Whether you're looking for reliability, durability, or aesthetic appeal, this product delivers on all fronts. Its versatile features make it an ideal choice for both professional and personal use. Invest in quality and elevate your experience with this outstanding product."
              status={productDetails.status}
              descriptionTitle={productDetails.title}
            />
          </div>
        </div>

        {/* Product Specifications */}
        <div className="mt-12">
          <ProductSpecifications
            isPhysicalProduct={productDetails.isPhysicalProduct ?? false}
            weight={productDetails.weight}
            weightUnit={productDetails.weightUnit}
            height={productDetails.height}
            width={productDetails.width}
            length={productDetails.length}
            country={productDetails.country}
            hsCode={productDetails.hsCode}
          />
        </div>
      </div>
    </WebContainer>
  )
}
