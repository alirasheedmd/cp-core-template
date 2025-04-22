"use client";

import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "./ProductInfo";
import { useState } from "react";
import { useCloudinaryMediaLibrary } from "@/hooks/useCloudinaryMediaLibrary";
import ImageGrid from "./ImageGrid";

export default function ImageUpload() {
  const { setValue, watch } = useFormContext<ProductFormValues>();
  const images = watch("images") || [];
  const [error, setError] = useState<string | null>(null);
  const { isLoaded: isMediaLibraryLoaded, error: mediaLibraryError } =
    useCloudinaryMediaLibrary();

  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    console.log("result", result.info);
    if (
      result?.info &&
      typeof result.info === "object" &&
      "secure_url" in result.info
    ) {
      const currentImages = Array.isArray(images) ? images : [];
      const newImages = [...currentImages, result.info.secure_url];
      console.log("Uploaded images:", newImages);
      setValue("images", newImages, {
        shouldValidate: true,
      });
      setError(null);
    } else {
      setError("Failed to upload image");
    }
  };

  const handleMediaLibrarySelect = () => {
    if (!isMediaLibraryLoaded) {
      setError("Cloudinary Media Library not loaded. Please try again.");
      return;
    }

    window.cloudinary.openMediaLibrary(
      {
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
        folder: { path: "products" },
        multiple: true,
        max_files: 5,
        insert_caption: "Insert Images",
      },
      {
        insertHandler: (data) => {
          if (data.assets && data.assets.length > 0) {
            const currentImages = Array.isArray(images) ? images : [];
            const newImages = data.assets.map((asset) => asset.secure_url);
            console.log("Selected images from library:", newImages);
            setValue("images", [...currentImages, ...newImages], {
              shouldValidate: true,
            });
            setError(null);
          } else {
            setError("No images selected.");
          }
        },
        errorHandler: () => {
          setError("Failed to load Media Library. Please try again.");
        },
      },
    );
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setValue("images", newImages, { shouldValidate: true });
  };

  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6">
      {images.length > 0 && (
        <ImageGrid images={images} onRemoveImage={removeImage} />
      )}
      <div className="mt-4 flex flex-col items-center justify-center gap-4">
        <div className="flex gap-3">
          <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-params"
            onSuccess={handleUploadSuccess}
            onError={() => setError("Upload failed. Please try again.")}
            options={{
              sources: ["local", "url", "google_drive", "dropbox", "unsplash"],
              multiple: true,
              maxFiles: 5,
              folder: "products",
            }}
          >
            {({ open }) => (
              <Button
                variant="default"
                type="button"
                onClick={() => open()}
                className="rounded-md px-4 py-2 font-medium"
              >
                Upload Media
              </Button>
            )}
          </CldUploadWidget>

          <Button
            variant="outline"
            type="button"
            onClick={handleMediaLibrarySelect}
            className="rounded-md border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50"
          >
            Select from Library
          </Button>
        </div>
        {images.length === 0 && (
          <p className="text-sm text-gray-500">
            Accepts images, videos, and 3D models
          </p>
        )}
        {(error || mediaLibraryError) && (
          <p className="text-sm text-red-600">{error || mediaLibraryError}</p>
        )}
      </div>
    </div>
  );
}
