import { getOneProduct } from '@/lib/dal'
import WebContainer from '@/components/web/shared/WebContainer'
import ProductImage from './ProductImage'
import ProductInfo from './ProductInfo'
import ProductSpecifications from './ProductSpecifications'
import PrimaryButton from '@/components/common/PrimaryButton'

export default async function ProductData({ product }: { product: string }) {
  const productDetails = await getOneProduct(product)

  if (!productDetails) {
    return (
      <WebContainer>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-y-6 py-12 text-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gray-100 p-6">
              <svg
                className="h-full w-full text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="absolute -top-2 -right-2 h-4 w-4 animate-ping rounded-full bg-red-500/30" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">
              Product Not Found
            </h2>
            <p className="text-gray-500">
              We couldn&apos;t find the product you&apos;re looking for
            </p>
          </div>
          <PrimaryButton className="max-w-80" fullWidth>
            Back to Shop
          </PrimaryButton>
        </div>
      </WebContainer>
    )
  }

  return (
    <WebContainer className="py-8">
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
            image={productDetails.images?.[0]}
            slug={productDetails.slug}
            shippingPrice={productDetails.shippingPrice as string}
            tax={productDetails.tax as string}
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
    </WebContainer>
  )
}
