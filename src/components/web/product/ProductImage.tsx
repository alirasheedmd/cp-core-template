'use client'

import Image from 'next/image'
import { useState, useMemo, useCallback } from 'react'
import FsLightbox from 'fslightbox-react'

interface ProductImageProps {
  title: string
  imageUrl?: string
  images?: string[]
}

export default function ProductImage({
  title,
  imageUrl,
  images = [],
}: ProductImageProps) {
  const [selectedImage, setSelectedImage] = useState(imageUrl || images[0])
  const [toggler, setToggler] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Memoize the images array
  const allImages = useMemo(
    () => (imageUrl ? [imageUrl, ...images] : images),
    [imageUrl, images],
  )

  const handleImageClick = useCallback(() => {
    setToggler((prev) => !prev)
  }, [])

  const handleThumbnailClick = useCallback((image: string) => {
    setIsLoading(true)
    setSelectedImage(image)
  }, [])

  return (
    <div className="space-y-4">
      <div
        className="bg-LightGrey relative aspect-square w-full cursor-pointer overflow-hidden rounded-lg"
        onClick={handleImageClick}
        role="button"
        tabIndex={0}
      >
        {selectedImage ? (
          <>
            {isLoading && (
              <div className="bg-LightGrey absolute inset-0 flex items-center justify-center">
                <div className="border-Red h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
              </div>
            )}
            <Image
              src={selectedImage}
              alt={title}
              fill
              className={`object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoadingComplete={() => setIsLoading(false)}
            />
          </>
        ) : (
          <div className="bg-LightGrey flex h-full w-full items-center justify-center">
            <span className="text-MediumGrey text-lg">No image available</span>
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="relative">
          <div className="scrollbar-hide flex gap-4 overflow-x-auto p-0.5">
            {allImages.map((image, index) => (
              <button
                key={image}
                onClick={() => handleThumbnailClick(image)}
                className={`relative aspect-square min-w-[100px] overflow-hidden rounded-md border ${
                  selectedImage === image
                    ? 'border-Red ring-Red ring'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 25vw, 15vw"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <FsLightbox
        toggler={toggler}
        sources={allImages}
        slide={allImages.findIndex((img) => img === selectedImage) + 1}
        loadOnlyCurrentSource={true}
      />
    </div>
  )
}
