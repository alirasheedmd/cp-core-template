import { CldImage } from "next-cloudinary";
import { X } from "lucide-react";

interface ImageGridProps {
  images: string[];
  onRemoveImage: (index: number) => void;
}

export default function ImageGrid({ images, onRemoveImage }: ImageGridProps) {
  if (images.length === 0) return null;
  console.log("images", images);
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="group relative">
          <CldImage
            src={image}
            width={96}
            height={96}
            crop="fill"
            alt={`Uploaded image ${index + 1}`}
            className="h-24 w-full rounded-md border border-gray-200 object-cover"
          />
          <button
            type="button"
            onClick={() => onRemoveImage(index)}
            className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-red-600"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
